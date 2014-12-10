angular
    .module('app')
    .controller('modalCtr', modalCtr);

function modalCtr($scope) {

    this.modalOpen = function(clip) {
        $scope.modalVideo = clip;
        this.modalToggle();
    }

}
