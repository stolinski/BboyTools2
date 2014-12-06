angular
    .module('app')
    .controller('MovesCtr', MovesCtr);

function MovesCtr(MovesSvc) {

    var _this = this;

    _this.newMove = false;

    MovesSvc.fetch().success(function(moves) {
        _this.moves = moves;
    });

    _this.btnToggle = function(newMove) {
        return !newMove ? 'Add New Move' : 'Cancel';
    }

    _this.addMove = function() {
        if (_this.moveBody) {
            MovesSvc.create({
                username: 'tora',
                body: _this.moveBody,
                type: _this.moveType,
                value: _this.moveValue,
                clip: _this.moveClip,
            }).success(function(move) {
                _this.moves.unshift(move);
                _this.moveBody = null
            });
        }
    }
};
