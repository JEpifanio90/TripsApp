(function() {
    'use strict';

    angular.module('tripsApp').controller('dashboardController', dashboardCtrlFn);

    dashboardCtrlFn.$inject = ['NgMap', 'requestService'];
    function dashboardCtrlFn(NgMap, requestService) {
        var dashboardScope = this;
        dashboardScope.trips = [];
        dashboardScope.currentTrip = {};
        getTrips();

        NgMap.getMap('tripMap').then(function(map) {
            dashboardScope.mapInstance = map;
        });

        function getTrips() {
            dashboardScope.currentTrip = null;
            dashboardScope.trips = [];
            requestService.get(true).then(function(response) {
                if (response.status === 200) {
                    response.data.forEach(trip => {
                        trip.markerId = trip.id + "marker";
                        trip.infoWindowId = trip.id + "infoWin";
                        dashboardScope.trips.push(trip);
                    });
                }
            }).catch(function(error) {
                console.log(error);
            });
        }
    }
})();