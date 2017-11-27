(function() {
    'use strict';

    angular.module('tripsApp').service('requestService', requestFn);

    requestFn.$inject = ['$http', 'APP_CONFIG'];
    function requestFn($http, APP_CONFIG) {
        var requestScope = this;
        requestScope.request = {};

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
            cleanUrl();
            requestScope.request.method = method;
            if (method !== 'POST' && !getAll) {
                requestScope.request.url += '/' + entityId;
            }
        }

        function cleanUrl() {
            if (requestScope.request.url.split('/').length > 3)
            {
                requestScope.request.url = requestScope.request.url.substring(0, requestScope.request.url.length - (requestScope.request.url.split('/')[3].length + 1));
            }
        }
    }
})();