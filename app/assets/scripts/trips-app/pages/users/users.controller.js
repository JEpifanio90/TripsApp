(function() {
    'use strict';

    angular.module('tripsApp').controller('usersController', usersCtrlFn);

    usersCtrlFn.$inject = ['APP_CONFIG', 'requestService', 'userSession'];
    function usersCtrlFn(APP_CONFIG, requestService, userSession) {
        var userScope = this;
        userScope.users = [];
        userScope.currentUser = null;
        requestService.headers = { Authorization: userSession.user.token };
        getUsers();

        userScope.setCurrentUser = function(user) {
            userScope.currentUser = user;
        };

        userScope.editUser = function() {
            requestService.patch(userScope.currentUser).then(function(response) {
                if (response.status === 200) {
                    userScope.currentUser = null;
                }
            }).then(function(error){
                console.log(error);
            });
        };

        userScope.deleteUser = function(user) {
            requestService.delete(user.id).then(function(response) {
                if (response.status === 204) {
                    getUsers();
                }
            }).then(function(error){
                console.log(error);
            });
        };

        userScope.cancel = function() {
            userScope.currentUser = null;
        };

        userScope.isNewUser = function() {
            return userScope.users.indexOf(userScope.currentUser) < 0;
        };

        function getUsers()  {
            userScope.currentUser = null;
            userScope.users = [];
            requestService.get(true).then(function(response) {
                if (response.status === 200) {
                    userScope.users = response.data;
                }
            }).catch(function(error) {
                console.log(error);
            });
        }
    }
})();