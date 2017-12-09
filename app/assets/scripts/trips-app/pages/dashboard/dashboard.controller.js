(function() {
    'use strict';

    angular.module('tripsApp').controller('dashboardController', dashboardCtrlFn);

    dashboardCtrlFn.$inject = ['NgMap'];
    function dashboardCtrlFn(NgMap) {
        var dashboardScope = this;
        dashboardScope.apiKey = 'AIzaSyD9fzFt0GjhKCpY7JMC-DCB5a8HNWC9ht8';
        NgMap.getMap().then(function(map) {
            console.log(map.getCenter());
            console.log('markers', map.markers);
            console.log('shapes', map.shapes);
        });
    }
})();