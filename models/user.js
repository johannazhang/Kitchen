/* User model */
'use strict';

const mongoose = require('mongoose')
const validator = require('validator')
const bcrypt = require('bcryptjs')

const UserSchema = new mongoose.Schema({
	name: {
		type: String,
		required: true,
		minlength: 1
	},
	email: {
		type: String,
		required: true,
		minlength: 1,
		trim: true,
		unique: true,
		validate: {
			validator: validator.isEmail,
			message: 'Not valid email'
		}
	},
	password: {
		type: String,
		required: true,
		minlength: 6
	}
})

// mongoose middleware, will run immediately prior to saving the document in the database
UserSchema.pre('save', function(next) {
	const user = this;

	// check to ensure we don't hash password more than once
	if (user.isModified('password')) {
		// generate salt and hash the password
		bcrypt.genSalt(10, (err, salt) => {
			bcrypt.hash(user.password, salt, (err, hash) => {
				user.password = hash
				next()
			})
		})
	} else {
		next()
	}
})

// static method to find a User document by comparing the hashed password to a given one
UserSchema.statics.findByEmailPassword = function(email, password) {
	const User = this

	return User.findOne({ email: email }).then((user) => {
		if (!user) {
			return Promise.reject()
		}
		return new Promise((resolve, reject) => {
			bcrypt.compare(password, user.password, (err, result) => {
				if (result) {
					resolve(user)
				} else {
					reject()
				}
			})
		})
	})
}

const User = mongoose.model('User', UserSchema)
module.exports = { User }
