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

};
