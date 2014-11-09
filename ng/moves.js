angular
	.module('app', ['ui.router'])
	.config(['$stateProvider', '$urlRouterProvider', function ($stateProvider,   $urlRouterProvider) {

      $stateProvider
        .state("home", {
          url: "/",
          templateUrl: "partials/moves.html"
        })
        .state("thirty", {
        	url: "/tools/3030",
        	templateUrl: "partials/thirty.html"
        })
        .state("battle", {
        	url: "/tools/battle-mode",
        	templateUrl: "partials/battle-mode.html"
        })        
    }
 ])
.controller('MovesCtr', function($scope, MovesSvc) {
	$scope.newMove = false;

	MovesSvc.fetch().success(function(moves) {
		$scope.moves = moves;
	});

	$scope.addMove = function() {
		if($scope.moveBody) {
			MovesSvc.create({
				username: 'tora',
				body: $scope.moveBody,
				type: $scope.moveType,
				value: $scope.moveValue,
				clip: $scope.moveClip,
			}).success(function(move) {
				$scope.moves.unshift(move);
				$scope.moveBody = null
			});	
		}
	}
})

.controller('ThirtyCtrl', ['$scope', '$timeout', function($scope, $timeout) {
  $scope.time = 0;
  
  function countdown() {
    $scope.time++;
    $scope.timeout = $timeout(countdown, 1000);
  }
  
  $scope.start = function() {
    countdown();
  };
  
  $scope.stop = function() {
    $timeout.cancel($scope.timeout);
  };

  $scope.reset = function() {
    $scope.time = 0;
  };


}]);