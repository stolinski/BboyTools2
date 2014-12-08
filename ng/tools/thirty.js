angular
    .module('app')
    .controller('ThirtyCtrl', ThirtyCtrl);

function ThirtyCtrl($timeout) {

    var _this = this;

    _this.time = 0;

    function countdown() {
        _this.time++;
        _this.timeout = $timeout(countdown, 1000);
    }

    _this.start = function() {
        countdown();
    };

    _this.stop = function() {
        $timeout.cancel(_this.timeout);
    };

    _this.reset = function() {
        _this.time = 0;
    };
};
