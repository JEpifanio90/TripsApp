(function() {
    'use strict';

    angular.module('tripsApp').controller('loginModalController', loginModalFn);

    loginModalFn.$inject = ['$mdDialog'];
    function loginModalFn($mdDialog) {
        var loginModalScope = this;
        loginModalScope.user = {
            firstName: '',
            lastName: '',
            email: '',
            role: '',
            password: '',
            passwordConfirmation: ''
        };
        loginModalScope.currentRole = '';

        loginModalScope.sendCredentials = function() {
            $mdDialog.hide(loginModalScope.user);
        };

        loginModalScope.assignAccountType = function(accountType) {
            loginModalScope.user.role = accountType;
        };

        loginModalScope.cancel = function() {
            $mdDialog.cancel();
        };
    }
})();