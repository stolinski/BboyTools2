var express = require('express');
var router = require('express').Router();

router.use(express.static(__dirname + '/../assets'));

router.get('/', function(req, res) {
    console.log(req.user);
    res.locals.user = req.user;
    res.render('index');
});

module.exports = router;
