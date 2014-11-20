angular
	.module('app', ['ui.router'])
	.config(['$stateProvider', '$urlRouterProvider', function ($stateProvider,   $urlRouterProvider) {
      $urlRouterProvider.otherwise('/');
      $stateProvider
        .state("home", {
          url: "/",
          templateUrl: "moves/moves.html"
        })              
        .state("thirty", {
        	url: "/tools/3030",
        	templateUrl: "tools/thirty.html"
        })
        .state("battle", {
        	url: "/tools/battle-mode",
        	templateUrl: "tools/battle-mode.html"
        })        
    }
]).controller('MovesCtr', function($scope, MovesSvc) {
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
}).controller('ThirtyCtrl', ['$scope', '$timeout', function($scope, $timeout) {
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
}])
.controller('BattleCtrl', function($scope, MovesSvc) {
	$scope.newMove = false;

	MovesSvc.fetch().success(function(moves) {
		$scope.moves = moves;
	});

})
.controller('RegCtlr', function($scope) {


})
.controller('LogCtlr', function($scope, UserSvc) {
	
	$scope.login = function(username, password) {
		UserSvc.login(username, password)
			.then(function (user) {
				console.log(user);
			});
	}

})
