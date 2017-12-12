(function() {
    'use strict';

    angular.module('tripsApp').directive('navHeader', navHeaderFn);

    navHeaderFn.$inject = ['APP_CONFIG'];
    function navHeaderFn(APP_CONFIG) {
        var navScope = this;

        return {
            templateUrl: APP_CONFIG.HEADER_VIEW,
            replace: true,
            bindToController: true,
            controller: "headerController",
            controllerAs: "headerCtrl",
            restrict: "E"

        };
    }
})();