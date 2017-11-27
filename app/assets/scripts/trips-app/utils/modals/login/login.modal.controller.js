(function() {
    'use strict';

    angular.module('tripsApp').controller('loginModalController', loginModalFn);

    loginModalFn.$inject = ['$mdDialog'];
    function loginModalFn($mdDialog) {
        var loginModalScope = this;
        loginModalScope.user = {
            first_name: '',
            last_name: '',
            email: '',
            role: '',
            password: '',
            password_confirmation: ''
        };
        loginModalScope.currentRole = '';

        loginModalScope.sendCredentials = function() {
            $mdDialog.hide(loginModalScope.user);
        };

        loginModalScope.assignAccountType = function(accountType) {
            loginModalScope.user.role = accountType;
            loginModalScope.user.isNew = true;
        };

        loginModalScope.cancel = function() {
            $mdDialog.cancel();
        };
    }
})();