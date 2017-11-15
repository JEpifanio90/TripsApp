(function() {
    'use strict';

    angular.module('tripsApp').controller('usersController', usersCtrlFn);

    usersCtrlFn.$inject = ['APP_CONFIG', 'requestService', 'userSession'];
    function usersCtrlFn(APP_CONFIG, requestService, userSession) {
        var usersScope = this;
        usersScope.users = [];
        usersScope.currentUser = {};
        requestService.prepareService('GET', APP_CONFIG.USERS_ENDPOINT, { Authorization: userSession.user.token });
        requestService.getHttpPromise().then(function(response) {
            if (response.status === 200) {
                usersScope.users = response.data;
            }
        }).catch(function(error) {
            console.log(error);
        });

        usersScope.setCurrentUser = function(user) {
            usersScope.currentUser = user;
        };

        usersScope.createUser = function(user) {
            requestService.prepareService('POST', APP_CONFIG.USERS_ENDPOINT, { Authorization: userSession.user.token }, user);
        };

        usersScope.modifyUser = function(user) {
            requestService.prepareService('PATCH', APP_CONFIG.USERS_ENDPOINT, { Authorization: userSession.user.token }, user);
        };

        usersScope.deleteUser = function(user) {
            requestService.prepareService('DELETE', APP_CONFIG.USERS_ENDPOINT, { Authorization: userSession.user.token }, user);
        };
    }
})();