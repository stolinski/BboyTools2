angular.module('app')
	.service('MovesSvc', function($http) {
	this.fetch = function () {
		return $http.get('/api/moves');
	}
	this.create = function(move) {
		return $http.post('/api/moves', move);
	}
});
