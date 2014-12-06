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
]).run(function($rootScope, $state) {
    $rootScope.$state = $state;
});