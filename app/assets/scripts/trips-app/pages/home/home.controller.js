(function() {
    'use strict';

    angular.module('tripsApp').controller('homeController', homeCtrlFn);

    homeCtrlFn.$inject = ['userSession'];
    function homeCtrlFn(userSession) {
        var homeScope = this;
        console.log(userSession);
    }
})();