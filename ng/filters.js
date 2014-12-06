angular.module('battleFilter', []).filter('battle', function() {
    return function(input, used) {

        if (input && used) {
            return used.indexOf(input[0].body) == -1 ? input : false;
        }
    };
}).filter('objectByKeyValFilter', function() {
    return function(input, filterKey, filterVal) {

        var filteredInput = {};

        angular.forEach(input, function(value, key) {
            if (value[filterKey] && value[filterKey] == filterVal) {
                filteredInput[key] = value;
            }
        });
        return filteredInput;
    }
});
