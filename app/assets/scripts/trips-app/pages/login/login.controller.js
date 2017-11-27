(function() {
    'use strict';

    angular.module('tripsApp').controller('loginController', loginCtrlFn);

    loginCtrlFn.$inject = ['$mdDialog', '$state', 'APP_CONFIG', 'requestService', 'userSession'];
    function loginCtrlFn($mdDialog, $state, APP_CONFIG, requestService, userSession) {
        var loginScope = this;

        loginScope.openModal = function(ev) {
            $mdDialog.show({
                controller: 'loginModalController',
                controllerAs: 'loginCtrl',
                templateUrl: APP_CONFIG.LOGIN_MODAL_VIEW,
                parent: angular.element(document.body),
                targetEvent: ev,
                clickOutsideToClose:true
            }).then(function(answer) {
                sendData(answer);
            }, function() { });
        };

        function sendData(data) {
            var isNewUser = (data.isNew !== undefined);
            requestService.setService((isNewUser) ?  APP_CONFIG.USERS_ENDPOINT : APP_CONFIG.LOGIN_ENDPOINT);
            delete data.isNew;
            requestService.post((isNewUser) ? { user: data } : data).then(function(response) {
                if (response.status === 200) {
                    userSession.setUserData(response.data);
                    $state.go('trips');
                }
            }).catch(function(error) {
                console.log(error);
            });
        }
    }
})();