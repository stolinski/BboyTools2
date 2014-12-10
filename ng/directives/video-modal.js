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
