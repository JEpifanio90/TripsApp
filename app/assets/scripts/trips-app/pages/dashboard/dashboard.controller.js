(function() {
    'use strict';

    angular.module('tripsApp').controller('dashboardController', dashboardCtrlFn);

    dashboardCtrlFn.$inject = ['googleMapsService', 'requestService'];
    function dashboardCtrlFn(googleMapsService, requestService) {
        var dashboardScope = this;
        dashboardScope.trips = [];
        dashboardScope.center = [40.74, -74.18];
        getTrips();
        googleMapsService.init('tripsMap');

        dashboardScope.findInMap = function(trip) {
            googleMapsService.setLocation(trip.lat, trip.lng);
        };

        function getTrips() {
            dashboardScope.trips = [];
            requestService.get(true).then(function(response) {
                if (response.status === 200) {
                    response.data.forEach(function(trip) {
                        googleMapsService.createMarker(trip);
                    });
                    dashboardScope.trips = response.data;
                }
            }).catch(function(error) {
                console.log(error);
            });
        }
    }
})();