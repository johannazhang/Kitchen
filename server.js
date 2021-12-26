"use strict";

const env = process.env.NODE_ENV

const log = console.log;
const path = require('path')

const express = require("express");

// start express server
const app = express();

// enable CORS if in development
const cors = require('cors')
if (env !== 'production') { app.use(cors()) }

// mongoose and mongo connection
const { mongoose } = require("./db/mongoose");
mongoose.set('useFindAndModify', false);

// import the mongoose models
const { Recipe } = require("./models/recipe");
const { User } = require("./models/user");

// to validate object IDs
const { ObjectID } = require("mongodb");

// body-parser: middleware for parsing parts of the request into a usable object (onto req.body)
const bodyParser = require('body-parser')
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }));


// express-session for managing user sessions
const session = require("express-session");
const MongoStore = require('connect-mongo')

// checks for first error returned by promise rejection if Mongo database suddently disconnects
function isMongoError(error) {
    return typeof error === 'object' && error !== null && error.name === "MongoNetworkError"
}

// middleware for mongo connection error for routes that need it
const mongoChecker = (req, res, next) => {
    if (mongoose.connection.readyState != 1) {
        log('Issue with mongoose connection')
        res.status(500).send('Internal server error')
        return;
    } else {
        next()
    }
}

// Middleware for authentication of resources
const authenticate = (req, res, next) => {
    if (req.session.user) {
        User.findById(req.session.user).then((user) => {
            if (!user) {
                return Promise.reject()
            } else {
                req.user = user
                next()
            }
        }).catch((error) => {
            res.status(401).send("Unauthorized")
        })
    } else {
        res.status(401).send("Unauthorized")
    }
}


/********* SESSION HANDLING *********/

// Create a session and session cookie
app.use(
    session({
        secret: process.env.SESSION_SECRET || "our hardcoded secret",
        resave: false,
        saveUninitialized: false,
        cookie: {
            expires: 86400000,
            httpOnly: true
        },
        // store the sessions on the database in production
        store: env === 'production' ? MongoStore.create({
          mongoUrl: process.env.MONGODB_URI || 'mongodb://localhost:27017/KitchenAPI'
        }) : null
    })
);

// route to login and create a session
app.post("/users/login", (req, res) => {
    const email = req.body.email;
    const password = req.body.password;

    User.findByEmailPassword(email, password)
        .then(user => {
            req.session.user = user._id;
            req.session.email = user.email;
            req.session.name = user.name;
            res.send({ currentUser: {email: user.email, name: user.name} });
        })
        .catch(error => {
            res.status(400).send()
        });
});

// route to logout a user
app.get("/users/logout", (req, res) => {
    req.session.destroy(error => {
        if (error) {
            res.status(500).send(error);
        } else {
            res.send()
        }
    });
});

// route to check if a user is logged in on the session
app.get("/users/check-session", (req, res) => {
    if (req.session.user) {
        res.send({ currentUser: {email: req.session.email, name: req.session.name} });
    } else {
        res.status(401).send();
    }
});


/********* API ROUTES *********/

/** USER API ROUTES **/
// POST route to create a user
app.post('/api/users', mongoChecker, async (req, res) => {
    const user = new User({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password
    })
    try {
        const newUser = await user.save()
        res.send(newUser)
    } catch (error) {
        if (isMongoError(error)) {
            res.status(500).send('Internal server error')
        } else {
            log(error)
            res.status(400).send('Bad Request')
        }
    }
})

// GET route to get all users
app.get('/api/users', mongoChecker, async (req, res) => {
    try {
        const users = await User.find()
        res.send( users )
    } catch(error) {
        log(error)
        res.status(500).send("Internal Server Error")
    }
})

/** RECIPE RESOURCE ROUTES **/
// POST route to create a recipe
app.post('/api/recipes', mongoChecker, authenticate, async (req, res) => {
    const recipe = new Recipe({
        name: req.body.name,
        category: req.body.category,
        description: req.body.description,
        ingredients: req.body.ingredients,
        instructions: req.body.instructions,
        creator: req.user._id
    })
    try {
        const result = await recipe.save()
        res.send(result)
    } catch(error) {
        log(error)
        if (isMongoError(error)) {
            res.status(500).send('Internal server error')
        } else {
            res.status(400).send('Bad Request')
        }
    }
})

// GET route to get all recipes
app.get('/api/recipes', mongoChecker, authenticate, async (req, res) => {
    try {
        const recipes = await Recipe.find({creator: req.user._id})
        res.send( {recipes} )
    } catch(error) {
        log(error)
        res.status(500).send("Internal Server Error")
    }
})

// GET route to get specific recipe
app.get('/api/recipes/:id', mongoChecker, authenticate, async (req, res) => {
  	const id = req.params.id
  	if (!ObjectID.isValid(id)) {
    		res.status(404).send()
    		return;
  	}
  	try {
    		const recipe = await Recipe.findById(id)
    		if (!recipe) {
    			  res.status(404).send('Resource not found')
    		} else {
    			  res.send({recipe})
    		}
  	} catch(error) {
    		log(error)
    		res.status(500).send('Internal Server Error')
  	}
})

// DELETE route to delete specific recipe
app.delete('/api/recipes/:id', mongoChecker, authenticate, async (req, res) => {
  	const id = req.params.id
  	if (!ObjectID.isValid(id)) {
  		res.status(404).send('Resource not found')
  		return;
  	}
  	try {
  		const recipe = await Recipe.findByIdAndRemove(id)
  		if (!recipe) {
  			res.status(404).send()
  		} else {
  			res.send(recipe)
  		}
  	} catch(error) {
  		console.log(error)
  		res.status(500).send()
  	}
})

/********* WEBPAGE ROUTES *********/

// serve the build
app.use(express.static(path.join(__dirname, "/client/build")));

app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "/client/build/index.html"));
});

/*************************************************/
// Express server listening...
const port = process.env.PORT || 5000;
app.listen(port, () => {
    log(`Listening on port ${port}...`);
});
