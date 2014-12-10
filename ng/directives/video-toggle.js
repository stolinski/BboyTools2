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
