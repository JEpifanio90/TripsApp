(function() {
    'use strict';

    angular.module('tripsApp').config(configFn);

    configFn.$inject = ['$mdThemingProvider'];
    function configFn($mdThemingProvider) {
        $mdThemingProvider
            .theme('default')
            .primaryPalette('grey', {
                'default': '800'
            })
            .accentPalette('light-blue', {
                'default': '700'
            })
            .warnPalette('teal', {
                'default': '700'
            });
            // .backgroundPalette('cyan');
    }
})();