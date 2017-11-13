(function() {
    'use strict';

    angular.module('tripsApp').controller('loginController', loginCtrlFn);

    loginCtrlFn.$inject = ['$mdDialog', 'APP_CONFIG', 'requestService'];
    function loginCtrlFn($mdDialog, APP_CONFIG, requestService) {
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
            requestService.url = APP_CONFIG.USER_ENDPOINT;
            requestService.data = { user: data };
            requestService.getHttpPromise().then(function(response) {
                console.log(response);
            }).catch(function(error) {
                console.log(error);
            });
        }
    }
})();