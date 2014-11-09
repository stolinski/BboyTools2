var express = require('express'),
	router = require('express').Router();

router.use(express.static(__dirname + '/../assets'));

router.get('/', function(req,res){
	res.sendfile('assets/index.html');
});

module.exports = router;