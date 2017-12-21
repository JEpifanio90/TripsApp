(function() {
    'use strict';

    angular.module('tripsApp').controller('dashboardController', dashboardCtrlFn);

    dashboardCtrlFn.$inject = ['NgMap', 'requestService'];
    function dashboardCtrlFn(NgMap, requestService) {
        var dashboardScope = this;
        dashboardScope.trips = [];
        dashboardScope.currentTrip = {};
        dashboardScope.center = [40.74, -74.18];
        getTrips();

        dashboardScope.findInMap = function(trip) {
            dashboardScope.center = [trip.lat, trip.lng];
        };

        NgMap.getMap('tripMap').then(function(map) {
            dashboardScope.mapInstance = map;
            dashboardScope.trips.forEach( trip => {
                dashboardScope.mapInstance.hideInfoWindow(trip.infoWindowId, trip.markerId);
            });
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