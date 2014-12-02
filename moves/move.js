var db = require('../db');
var mongoose = require('mongoose');
var ObjectId = mongoose.Schema.Types.ObjectId;

var Move = db.model('Move', {
	username: {
		type: String,
		required: true
	},

	body: {
		type: String,
		required: true
	},
	date: {
		type: Date,
		required: true,
		default: Date.now
	},
	type: {
		type: String,
		required: true
	},
	value: {
		type: Number
	},
	clip: {
		type: String
	},
	_user: {
		type: ObjectId,
		ref: 'User'
	}
});

module.exports = Move;
