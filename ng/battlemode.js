angular
    .module('app')
    .controller('BattleCtrl', BattleCtrl);

function BattleCtrl(MovesSvc) {

    var _this = this;

    _this.newMove = false;
    _this.used = [];

    MovesSvc.fetch().success(function(moves) {
        _this.moves = moves;
    });

    _this.useMove = function(moveId) {
        _this.used.push(moveId);
    }

    _this.endBattle = function(moveId) {
        _this.used = [];
    }

};
