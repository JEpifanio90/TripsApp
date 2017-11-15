(function() {
    'use strict';

    angular.module('tripsApp').service('requestService', requestFn);

    requestFn.$inject = ['$http'];
    function requestFn($http) {
        var requestScope = this;
        requestScope.headers = {};
        requestScope.method = '';
        requestScope.url = '';
        requestScope.data = {};

        requestScope.getHttpPromise = function() {
            return $http({
                method: requestScope.method,
                url: requestScope.url,
                headers: requestScope.headers,
                data: requestScope.data
            });
        };
    }
})();