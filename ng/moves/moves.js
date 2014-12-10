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
        console.log(clip);
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

};
