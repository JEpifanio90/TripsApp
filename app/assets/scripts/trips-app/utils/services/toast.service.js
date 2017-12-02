(function() {
    'use strict';

    angular.module('tripsApp').service('toastService', toastConfigFn);

    toastConfigFn.$inject = ['$mdToast'];
    function toastConfigFn($mdToast) {
        var toastScope = this;

        toastScope.show = function(icon, message) {
            var options = {
                template: '<md-toast><div class="md-toast-content">' + message + '  <i class="material-icons">' + icon + '</i></div></md-toast>'
            };

            $mdToast.show(options);
        };
    }
})();