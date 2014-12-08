angular
    .module('app')
    .controller('MovesCtr', MovesCtr);

function MovesCtr(MovesSvc) {

    var _this = this;

    _this.newMove = false;

    MovesSvc.fetch().success(function(moves) {
        _this.moves = moves;
    });

    _this.modalVideo = 'https://www.youtube.com/watch?v=18-xvIjH8T4';
    _this.videoModal = false;
    _this.modalOrigin = '0% 0%';

    _this.modalToggle = function() {
        _this.videoModal = !_this.videoModal;
    }

    _this.modalOpen = function(event, clip) {
        _this.modalVideo = clip;
        _this.modalOrigin = event.screenX + 'px ' + event.screenY + 'px';
        _this.videoModal = !_this.videoModal;
    }

    _this.btnToggle = function(newMove) {
        return !newMove ? 'Add New Move' : 'Cancel';
    }

    _this.addMove = function() {
        if (_this.moveBody) {
            MovesSvc.create({
                username: 'tora',
                body: _this.moveBody,
                type: _this.moveType,
                value: _this.moveValue,
                clip: _this.moveClip,
            }).success(function(move) {
                _this.moves.unshift(move);
                _this.moveBody = null
            });
        }
    }
};

app.directive('move', function(MovesSvc) {
    return {
        restrict: 'E',
        templateUrl: 'move.html',
        scope: true,
        link: function($scope, elem, attrs) {

            $scope.editToggle = function() {
                $scope.editMode = !$scope.editMode;
            }

            $scope.updateMove = function(id) {
                MovesSvc.update(id, {
                    body: $scope.moveEditName,
                    clip: $scope.moveEditClip,
                }).success(function(move) {
                    elem.find('h4').text(move.body);
                    elem.find('.move-clip').attr('url', move.clip);
                    $scope.editMode = false;
                });
            }
        }
    }
});
