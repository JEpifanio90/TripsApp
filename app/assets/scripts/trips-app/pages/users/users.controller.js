(function() {
    'use strict';

    angular.module('tripsApp').controller('usersController', usersCtrlFn);

    usersCtrlFn.$inject = ['APP_CONFIG', 'requestService', 'userSession'];
    function usersCtrlFn(APP_CONFIG, requestService, userSession) {
        var usersScope = this;
        usersScope.users = [];
        usersScope.currentUser = null;
        requestService.headers = { Authorization: userSession.user.token };
        getUsers();

        usersScope.setCurrentUser = function(user) {
            usersScope.currentUser = user;
        };

        usersScope.editUser = function() {
            requestService.prepareService('PATCH', usersScope.currentUser, usersScope.currentUser.id);
            requestService.getHttpPromise().then(function(response) {
                if (response.status === 200) {
                    usersScope.currentUser = null;
                }
            }).then(function(error){
                console.log(error);
            });
        };

        usersScope.deleteUser = function(user) {
            requestService.prepareService('DELETE', user, user.id);
            requestService.getHttpPromise().then(function(response) {
                if (response.status === 204) {
                    getUsers();
                }
            }).then(function(error){
                console.log(error);
            });
        };

        usersScope.cancel = function() {
            usersScope.currentUser = null;
        };

        usersScope.isNewUser = function() {
            return usersScope.users.indexOf(usersScope.currentUser) < 0;
        };

        function getUsers()  {
            usersScope.currentUser = null;
            usersScope.users = [];
            requestService.url = APP_CONFIG.USERS_ENDPOINT;
            requestService.method = 'GET';
            requestService.getHttpPromise().then(function(response) {
                if (response.status === 200) {
                    usersScope.users = response.data;
                }
            }).catch(function(error) {
                console.log(error);
            });
        }
    }
})();