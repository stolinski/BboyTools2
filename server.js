var express = require('express'),
	bodyParser = require('body-parser'),
	jwt = require('jwt-simple'),
	router = express.Router();

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


app.use( require('./controllers/static'));













// =====================================
// LOGIN ===============================
// =====================================
// show the login form
app.get('/login', function(req, res) {
    res.locals.user = false;
    // render the page and pass in any flash data if it exists
    res.render('login.ejs', { message: req.flash('loginMessage') }); 
});

// process the login form
app.post('/login', passport.authenticate('local-login', {
    successRedirect : '/#/', // redirect to the secure profile section
    failureRedirect : '/login', // redirect back to the signup page if there is an error
    failureFlash : true // allow flash messages
}));











// =====================================
// SIGNUP ==============================
// =====================================
// show the signup form
app.get('/signup', function(req, res) {
    res.locals.user = false;
    // render the page and pass in any flash data if it exists
    res.render('signup.ejs', { message: req.flash('signupMessage') });
});




// process the signup form
app.post('/signup', passport.authenticate('local-signup', {
    successRedirect : '/#/', // redirect to the secure profile section
    failureRedirect : '/signup', // redirect back to the signup page if there is an error
    failureFlash : true // allow flash messages
}));










// =====================================
// LOGOUT ==============================
// =====================================
app.get('/logout', function(req, res) {
    req.logout();
    res.redirect('/#/');
});

// route middleware to make sure a user is logged in
function isLoggedIn(req, res, next) {

    // if user is authenticated in the session, carry on 
    if (req.isAuthenticated())
        return next();

    // if they aren't redirect them to the home page
    res.redirect('/#/');
}








app.listen(4000, function() {
	console.log('Server Listening on 4000');
});