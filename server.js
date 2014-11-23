var express = require('express');
var	bodyParser = require('body-parser');
var	jwt = require('jwt-simple');
var	router = express.Router();

var port     = process.env.PORT || 8080;
var passport = require('passport');
var flash    = require('connect-flash');

var morgan       = require('morgan');
var cookieParser = require('cookie-parser');
var session      = require('express-session');

var engine = require('ejs-locals');

var Move = require('./moves/move');

var secretKey = 'supersecretkey';

var app = express();

// set up our express application
app.use(morgan('dev')); // log every request to the console
app.use(cookieParser()); // read cookies (needed for auth)
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.engine('ejs', engine);

app.set('views', __dirname + '/assets');
app.set('view engine', 'ejs');

// required for passport
app.use(session({ secret: 'bboytoolsbruh' })); // session secret
app.use(passport.initialize());
app.use(passport.session()); // persistent login sessions
app.use(flash()); // use connect-flash for flash messages stored in session

require('./config')(passport); // pass passport for configuration

app.use('/api/moves', require('./controllers/moves'));

app.use(require('./controllers/users'));
app.use(require('./controllers/static'));

app.listen(4000, function() {
    console.log('Server Listening on 4000');
});
