var Move = require('../moves/move');
var router = require('express').Router();

router.get('/', function(req, res, next) {
    console.log(req.user);
    Move.find({ '_user': req.user }).sort('-date').exec(function(err, moves) {
        if (err) {
            return next(err);
        }
        res.json(moves);
    });
});

router.post('/', function(req, res, next) {
    var move = new Move({
        username: req.body.username,
        body: req.body.body,
        type: req.body.type,
        value: req.body.value,
        clip: req.body.clip,
        _user : req.user
    });
    move.save(function(err, move) {
        if (err) {
            return next(err);
        }

        res.status(210).json(move);
    });
});

module.exports = router;
