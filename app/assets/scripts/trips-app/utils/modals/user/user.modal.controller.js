(function() {
    'use strict';

    angular.module('tripsApp').controller('userController', userModalFn);

    userModalFn.$inject = ['$mdDialog', 'FileUploader', 'userSession', 'currentUser'];
    function userModalFn($mdDialog, FileUploader, userSession, currentUser) {
        var userScope = this;
        userScope.userInfo = (currentUser) ? currentUser : {
            first_name: '',
            last_name: '',
            email: '',
            role: '',
            password: '',
            password_confirmation: '',
            image_name: ''
        };
        userScope.uploader = new FileUploader({
            url: 'http://localhost:3000/api/images',
            headers: {
                Authorization: userSession.user.token
            },
            autoUpload: true,
            withCredentials: true,
            queueLimit: 1
        });

        userScope.uploader.onBeforeUploadItem = function(item) {
            userScope.uploader.queue[0].alias = 'image';
        };

        userScope.uploader.onSuccessItem = function(fileItem, response, status, headers) {
            userScope.userInfo.image_name = response.id + response.name;
        };

        userScope.setRole = function(role) {
            userScope.userInfo.role = role;
        };

        userScope.cancel = function() {
            $mdDialog.cancel();
        };

        userScope.hide = function() {
            $mdDialog.hide((!currentUser) ? { user: userScope.userInfo} : userScope.userInfo);
        };
    }
})();