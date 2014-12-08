angular.module('app')
    .service('MovesSvc', MovesSvc);

function MovesSvc($http) {
    var _this = this;

    _this.fetch = fetch;
    _this.fetchOne = fetchOne;
    _this.create = create;
    _this.update = update;

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
