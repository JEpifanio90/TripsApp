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

        requestScope.prepareService = function(method, url, headers, data) {
            requestScope.headers = headers;
            requestScope.url = url;
            requestScope.method = method;
            if (data) {
                requestScope.data = data;
            }
        };

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