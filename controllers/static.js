var express = require('express');
var router = require('express').Router();

router.use(express.static(__dirname + '/../assets'));

router.get('/', isLoggedIn, function(req, res) {
    res.locals.user = req.user;
    res.render('index');
});

router.get('/home', function(req, res) {
    res.locals.user = '';
    res.render('home.ejs');
});

// route middleware to make sure a user is logged in
function isLoggedIn(req, res, next) {

    // if user is authenticated in the session, carry on
    if (req.isAuthenticated()) {
        return next();
    }

    // if they aren't redirect them to the home page
    res.redirect('/home');
}

module.exports = router;
