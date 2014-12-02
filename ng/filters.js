angular.module('battleFilter', []).filter('battle', function() {
    return function(input, used) {

        if (input && used) {
            return used.indexOf(input[0].body) == -1 ? input : false;
        }
    };
});
