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
            password_confirmation: ''
        };
        loginModalScope.currentRole = '';

        loginModalScope.sendCredentials = function() {
            $mdDialog.hide({ user: loginModalScope.user});
        };

        loginModalScope.assignAccountType = function(accountType) {
            loginModalScope.user.role = accountType;
        };

        loginModalScope.cancel = function() {
            $mdDialog.cancel();
        };
    }
})();