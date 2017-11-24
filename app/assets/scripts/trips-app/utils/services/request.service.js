(function() {
    'use strict';

    angular.module('tripsApp').service('requestService', requestFn);

    requestFn.$inject = ['$http', 'APP_CONFIG'];
    function requestFn($http, APP_CONFIG) {
        var requestScope = this;
        requestScope.request = {};
        resetService();

        requestScope.setService = function(endpoint, authToken) {
            resetService();
            requestScope.request.headers = { Authorization: authToken };
            requestScope.request.url += endpoint ;
        };

        requestScope.post = function(entity) {
            prepareService('POST');
            requestScope.request.data = entity;

            return getHttpPromise();
        };

        requestScope.patch = function(entity) {
            prepareService('PATCH', entity.id);
            requestScope.request.data = entity;

            return getHttpPromise();
        };
        
        requestScope.get = function(getAll, entityId) {
            if (getAll) {
                prepareService('GET', null, getAll);
            } else {
                prepareService('GET', entityId, getAll);
            }

            return getHttpPromise();
        };

        requestScope.delete = function(entityId) {
            prepareService('DELETE', entityId);

            return getHttpPromise();
        };

        function resetService() {
            requestScope.request.headers = {};
            requestScope.request.method = '';
            requestScope.request.url = APP_CONFIG.SERVER_URL;
            requestScope.request.data = {};
        }

        function getHttpPromise() {
            return $http(requestScope.request);
        }

        function prepareService(method, entityId, getAll) {
            requestScope.request.method = method;
            if (method !== 'POST' || (method === 'GET' && !getAll) && entityId) {
                requestScope.request.url += '/' + entityId;
            }
        }
    }
})();