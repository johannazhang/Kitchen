import React from 'react';

import { Route, Switch, BrowserRouter } from 'react-router-dom';
import './App.css';

import Home from './views/home'
import Recipes from './views/recipes/recipes.js'
import Mains from './views/recipes/mains.js'
import Sides from './views/recipes/sides.js'
import Desserts from './views/recipes/desserts.js'
import Snacks from './views/recipes/snacks.js'
import Drinks from './views/recipes/drinks.js'
import Recipe from './views/recipe'
import NewRecipe from './views/newRecipe'
import Login from './views/login'
import Signup from './views/signup'

import { checkSession } from "./actions/user";

class App extends React.Component {

  componentDidMount() {
      checkSession(this); // check if user is logged in
  }

  state = {
    currentUser: null,
    recipes: [],
    mains: [],
    sides: [],
    desserts: [],
    snacks: [],
    drinks: [],
    currentRecipe: null,
    currentCategory: null
  }

  render() {
    const { currentUser } = this.state;

    return (
        <div>
        <BrowserRouter>
          <Switch>

            <Route exact path={["/", "/login", "/home"]} render={ props => (
                <div>
                  {!currentUser ? <Login {...props} app={this} /> : <Home {...props} app={this} />}
                </div>
            )}/>

            <Route exact path="/signup" render={ props => (
                <div> {!currentUser ? <Signup {...props} app={this} /> : <Home {...props} app={this} />}</div>                   // ... spread operator - provides all of the props in the props object
            )}/>

            <Route exact path="/recipes" render={ props => (
                <div> {!currentUser ? <Login {...props} app={this} /> : <Recipes {...props} app={this} />}</div>                   // ... spread operator - provides all of the props in the props object
            )}/>
            <Route exact path="/mains" render={ props => (
                <div> {!currentUser ? <Login {...props} app={this} /> : <Mains {...props} app={this} />}</div>                   // ... spread operator - provides all of the props in the props object
            )}/>
            <Route exact path="/sides" render={ props => (
                <div> {!currentUser ? <Login {...props} app={this} /> : <Sides {...props} app={this} />}</div>                   // ... spread operator - provides all of the props in the props object
            )}/>
            <Route exact path="/desserts" render={ props => (
                <div> {!currentUser ? <Login {...props} app={this} /> : <Desserts {...props} app={this} setRecipeState={this.setRecipeState} />}</div>                   // ... spread operator - provides all of the props in the props object
            )}/>
            <Route exact path="/snacks" render={ props => (
                <div> {!currentUser ? <Login {...props} app={this} /> : <Snacks {...props} app={this} />}</div>                   // ... spread operator - provides all of the props in the props object
            )}/>
            <Route exact path="/drinks" render={ props => (
                <div> {!currentUser ? <Login {...props} app={this} /> : <Drinks {...props} app={this} />}</div>                   // ... spread operator - provides all of the props in the props object
            )}/>
            <Route exact path="/new-recipe" render={ props => (
                <div> {!currentUser ? <Login {...props} app={this} /> : <NewRecipe {...props} app={this} />}</div>                   // ... spread operator - provides all of the props in the props object
            )}/>
            
            <Route exact path="/recipe/:id" render={ props => (
                <div> {!currentUser ? <Login {...props} app={this} /> : <Recipe {...props} app={this} />}</div>                   // ... spread operator - provides all of the props in the props object
            )}/>

            <Route render={() => <div className="app">404 Not found</div>} />

          </Switch>
        </BrowserRouter>
      </div>
    );
  }
}

export default App;
