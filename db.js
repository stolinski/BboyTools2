var mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/bboytools', function() {
	console.log('mongodb connected');
});

module.exports = mongoose;