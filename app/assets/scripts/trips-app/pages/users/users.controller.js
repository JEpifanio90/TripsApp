(function() {
    'use strict';

    angular.module('tripsApp').controller('usersController', usersCtrlFn);

    usersCtrlFn.$inject = ['APP_CONFIG', 'requestService', 'userSession'];
    function usersCtrlFn(APP_CONFIG, requestService, userSession) {
        var usersScope = this;
        usersScope.users = [];
        requestService.headers = { Authorization: userSession.user.token };
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
})();