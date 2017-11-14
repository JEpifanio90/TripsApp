(function() {
    'use strict';

    angular.module('tripsApp').controller('loginController', loginCtrlFn);

    loginCtrlFn.$inject = ['$mdDialog', '$state', 'APP_CONFIG', 'requestService'];
    function loginCtrlFn($mdDialog, $state, APP_CONFIG, requestService) {
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
            requestService.method = 'POST';
            requestService.url = (data.firstName || data.lastName) ?  APP_CONFIG.USER_ENDPOINT : APP_CONFIG.LOGIN_ENDPOINT;
            requestService.data = (requestService.url === APP_CONFIG.USER_ENDPOINT) ? { user: data } : data;
            requestService.getHttpPromise().then(function(response) {
                console.log(response);
                $state.go('home');
            }).catch(function(error) {
                console.log(error);
            });
        }
    }
})();