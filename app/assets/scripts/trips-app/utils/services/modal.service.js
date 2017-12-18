(function() {
    'use strict';

    angular.module('tripsApp').service('modalService', modalServiceFn);

    modalServiceFn.$inject = []
    function modalServiceFn() {
        var modalScope = this;

        modalScope.getDialogOptions = function(template, method, controller, controllerAlias, ev, params) {
            return {
                controller: controller,
                controllerAs: controllerAlias,
                templateUrl: template,
                parent: angular.element(document.body),
                locals: { currentTrip: params },
                targetEvent: ev,
                clickOutsideToClose: true,
                escapeToClose: true
            };
        };
    }
})();