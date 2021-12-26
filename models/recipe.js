/* Recipe model */
const mongoose = require('mongoose')

const Recipe = mongoose.model('Recipe', {
	name: {
		type: String,
		required: true
	},
	category: {
		type: String,
		required: true
	},
	description: {
		type: String,
	},
	ingredients: {
		type: [{type: String}]
	},
	instructions: {
		type: [{type: String}]
	},
	creator: {
		type: mongoose.Schema.Types.ObjectId,
		required: true
	}
})

module.exports = { Recipe }
