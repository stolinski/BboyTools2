var db = require('../db');

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
	}
});

module.exports = Move;
