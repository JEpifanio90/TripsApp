(function() {
    'use strict';

    angular.module('tripsApp').service('userSession', userSessionFn);

    userSessionFn.$inject = [];
    function userSessionFn() {
        var userScope = this;
        reset();

        userScope.setUserData = function(data) {
            userScope.user.firstName = data.user.first_name;
            userScope.user.lastName = data.user.last_name;
            userScope.user.email = data.user.email;
            userScope.user.role = data.user.role;
            userScope.user.token = data.auth_token;
        };

        userScope.resetSession = function() {
            reset();
        };

        function reset() {
            userScope.user = {
                firstName: '',
                lastName: '',
                email: '',
                role: '',
                token: ''
            };
        }
    }
})();