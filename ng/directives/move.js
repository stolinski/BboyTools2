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

};
