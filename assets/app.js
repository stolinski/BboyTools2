var app = angular.module('app', [
	'ui.router',
	'ngAnimate',
	'battleFilter',
	'youtube-embed'
]);

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

angular
    .module('app')
    .config(['$stateProvider', '$urlRouterProvider', function($stateProvider,   $urlRouterProvider) {

        $urlRouterProvider.otherwise('/');
        $stateProvider
        .state('home', {
          url: '/',
          templateUrl: 'moves/moves.html'
        })
        .state('thirty', {
            url: '/tools/3030',
            templateUrl: 'tools/thirty.html'
        })
        .state('battle', {
            url: '/tools/battle-mode',
            templateUrl: 'tools/battle-mode.html'
        })
        .state('profile', {
            url: '/profile',
            templateUrl: 'user/profile.html'
        })
    }
]).run(["$rootScope", "$state", function($rootScope, $state) {
    $rootScope.$state = $state;
}]);

angular
    .module('app')
    .controller('modalCtr', modalCtr);

function modalCtr($scope) {

    this.modalOpen = function(clip) {
        $scope.modalVideo = clip;
        this.modalToggle();
    }

}
modalCtr.$inject = ["$scope"];

angular
    .module('app')
    .directive('move', Move);

function Move(MovesSvc) {
    var directive = {
        restrict: 'E',
        templateUrl: 'move.html',
        scope: true,
        link: link
    }

    return directive;

    function link(scope, elem, attrs) {

        scope.editToggle = function() {
            scope.editMode = !scope.editMode;
        }

        scope.updateMove = function(id) {
            MovesSvc.update(id, {
                body: scope.moveEditName,
                clip: scope.moveEditClip,
            }).success(function(move) {
                scope.editMode = false;
                elem.find('h4').text(move.body);
                elem.find('.move-clip').attr('url', move.clip);
            });
        }
    }

}
Move.$inject = ["MovesSvc"];;

angular
    .module('app')
    .directive('videoModal', videoModal);

function videoModal() {
    return {
        restrict: 'E',
        templateUrl: 'video.html',
        scope : false,
        link: function(scope, elem, attrs) {
            elem.on('click', function() {
                scope.$apply(function() {
                    scope.closeModal();
                });
            });
        }
    }
};

angular
    .module('app')
    .directive('videoToggle', videoToggle);

function videoToggle() {
    return {
        restrict: 'E',
        template: '<span><img src="/img/video.svg">Watch Here</span>',
        scope : false,
        link: function(scope, elem, attrs) {
            elem.on('click', function() {
                scope.$apply(function() {
                    scope.modalOpen(attrs.url);
                });
            });
        }
    }
};

angular
    .module('app')
    .controller('MovesCtr', MovesCtr);

function MovesCtr($scope, MovesSvc) {

    var vm = this;

    vm.newMove = false;

    MovesSvc.fetch().success(function(moves) {
        vm.moves = moves;
    });

    $scope.modalVideo = 'https://www.youtube.com/watch?v=18-xvIjH8T4';
    $scope.videoShow = false;

    $scope.modalOpen = function(clip) {
        $scope.modalVideo = clip;
        $scope.videoShow = !$scope.videoShow;
    };

    $scope.closeModal = function() {
        $scope.videoShow = false;
    };

    vm.btnToggle = function(newMove) {

        return !newMove ? 'Add New Move' : 'Cancel';
    }

    vm.addMove = function() {
        if (vm.moveBody) {
            MovesSvc.create({
                username: 'tora',
                body: vm.moveBody,
                type: vm.moveType,
                value: vm.moveValue,
                clip: vm.moveClip,
            }).success(function(move) {
                vm.moves.unshift(move);
                vm.moveBody = null
            });
        }
    }

}
MovesCtr.$inject = ["$scope", "MovesSvc"];;

angular.module('app')
    .service('MovesSvc', MovesSvc);

function MovesSvc($http) {
    var vm = this;

    vm.fetch = fetch;
    vm.fetchOne = fetchOne;
    vm.create = create;
    vm.update = update;

    function fetch() {
        return $http.get('/api/moves');
    }

    function fetchOne(id, move) {
        return $http.get('/api/moves/' + id, move);
    }

    function create(move) {
        return $http.post('/api/moves', move);
    }

    function update(id, move) {
        return $http.post('/api/moves/' + id, move);
    }

}
MovesSvc.$inject = ["$http"];;

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

}
BattleCtrl.$inject = ["MovesSvc"];;

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
}
ThirtyCtrl.$inject = ["$timeout"];;
