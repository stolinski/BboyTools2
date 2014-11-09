var express = require('express'),
	bodyParser = require('body-parser'),
	router = express.Router();

var Move = require('./moves/move');


var app = express();

app.use(bodyParser.json());

app.use('/api/moves', require('./controllers/moves'));



app.use( require('./controllers/static'));




app.listen(4000, function() {
	console.log('Server Listening on 4000');
});