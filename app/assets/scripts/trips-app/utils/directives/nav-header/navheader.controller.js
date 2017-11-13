(function() {
    'use strict';

    angular.module('tripsApp').controller('headerController', headerCtrlFn);

    headerCtrlFn.$inject = ['$mdSidenav'];
    function headerCtrlFn($mdSidenav) {
        var headerScope = this;

        headerScope.openMenu = function() {
			$mdSidenav('rightMenu').toggle();
        };
    }
})();