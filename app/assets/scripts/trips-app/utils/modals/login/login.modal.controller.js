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
            accountType: '',
            password: ''
        };
        loginModalScope.currentAccountType = '';

        loginModalScope.sendCredentials = function() {
            var user = {
                first_name: loginModalScope.user.firstName,
                last_name: loginModalScope.user.lastName,
                email: loginModalScope.user.email,
                role: loginModalScope.user.accountType,
                access_to_module_8: true
            };
            $mdDialog.hide(user);
        };

        loginModalScope.assignAccountType = function(accountType) {
            loginModalScope.user.accountType = accountType;
        };

        loginModalScope.cancel = function() {
            $mdDialog.cancel();
        };
    }
})();