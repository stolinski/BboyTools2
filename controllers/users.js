var router = require('express').Router();
var	bcrypt = require('bcrypt');
var	User = require('../models/user');
var	jwt = require('jwt-simple');
var	config = require('../config');
var passport = require('passport');

// GET Login Form
// /login
router.get('/login', function(req, res) {
    res.locals.user = false;
    // render the page and pass in any flash data if it exists
    res.render('login.ejs', { message: req.flash('loginMessage') });
});

// POST logs user in
// /login
router.post('/login', passport.authenticate('local-login', {
    successRedirect : '/#/', // redirect to the secure profile section
    failureRedirect : '/login', // redirect back to the signup page if there is an error
    failureFlash : true // allow flash messages
}));

// GET Signup Form
// /signup
router.get('/signup', function(req, res) {
    res.locals.user = false;
    // render the page and pass in any flash data if it exists
    res.render('signup.ejs', { message: req.flash('signupMessage') });
});

// POST registers new user
// /signup
router.post('/signup', passport.authenticate('local-signup', {
    successRedirect : '/#/', // redirect to the secure profile section
    failureRedirect : '/signup', // redirect back to the signup page if there is an error
    failureFlash : true // allow flash messages
}));

// GET Logs user out
// /logout
router.get('/logout', function(req, res) {
    req.logout();
    res.redirect('/#/');
});

// route middleware to make sure a user is logged in
function isLoggedIn(req, res, next) {

    // if user is authenticated in the session, carry on 
    if (req.isAuthenticated()) {
        return next();
    }

    // if they aren't redirect them to the home page
    res.redirect('/#/');
}

module.exports = router;
