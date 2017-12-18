(function() {
    'use strict';

    angular.module('tripsApp').controller('usersController', usersCtrlFn);

    usersCtrlFn.$inject = ['$mdDialog', 'APP_CONFIG', 'requestService', 'userSession'];
    function usersCtrlFn($mdDialog, APP_CONFIG, requestService, userSession) {
        var userScope = this;
        userScope.users = [];
        requestService.headers = { Authorization: userSession.user.token };
        getUsers();

        userScope.newUser = function() {
            showModal('POST', 'userController', 'userCtrl', undefined, false);
        };

        userScope.editUser = function(user) {
            showModal('PATCH', 'userController', 'userCtrl', undefined, user);
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

        function showModal(method, controller, controllerAlias, ev, params) {
            var modalOptions = {
                controller: controller,
                controllerAs: controllerAlias,
                templateUrl: APP_CONFIG.USER_MODAL_VIEW,
                parent: angular.element(document.body),
                locals: { currentUser: params },
                targetEvent: ev,
                clickOutsideToClose: true,
                escapeToClose: true
            };

            $mdDialog.show(modalOptions).then(function(user) {
                sendData(method, user);
            }, function() { });
        }

        function sendData(method, user) {
            switch (method) {
                case 'POST':
                    requestService.post(user).then(function(response) {
                        if (response.status === 201) {
                            getUsers();
                        }
                    }).then(function(error){
                        console.log(error);
                    });
                break;

                case 'PATCH':
                    requestService.patch(user).then(function(response) {
                        if (response.status === 200) {
                            getUsers();
                        }
                    }).then(function(error){
                        console.log(error);
                    });
                break;
            }
        }
    }
})();