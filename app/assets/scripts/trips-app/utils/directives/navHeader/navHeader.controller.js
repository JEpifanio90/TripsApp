(function() {
    'use strict';

    angular.module('tripsApp').controller('headerController', headerCtrlFn);

    headerCtrlFn.$inject = ['$mdSidenav', 'userSession'];
    function headerCtrlFn($mdSidenav, userSession) {
        var headerScope = this;

        headerScope.openMenu = function() {
			$mdSidenav('rightMenu').toggle();
        };

        headerScope.isAdmin = function() {
            return (userSession.user.role === 'master' || userSession.user.role === 'Trips Manager');
        };

        headerScope.resetEverything = function() {
            userSession.resetSession();
        };
    }
})();