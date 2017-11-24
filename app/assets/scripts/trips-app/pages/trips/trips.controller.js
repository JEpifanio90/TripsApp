(function() {
    'use strict';

    angular.module('tripsApp').controller('tripsController', tripsCtrlFn);

    tripsCtrlFn.$inject = ['APP_CONFIG', 'requestService'];
    function tripsCtrlFn(APP_CONFIG, requestService) {
        var tripScope = this;
        tripScope.trips = [];
        tripScope.currentTrip = null;
        getTrips();

        tripScope.setTrip = function(trip) {
            tripScope.currentTrip = trip;
        };

        tripScope.createTrip = function() {
            requestService.prepareService('POST', tripScope.currentTrip);
            requestService.getHttpPromise().then(function(response) {
                if (response.status === 201) {
                    getTrips();
                }
            }).then(function(error){
                console.log(error);
            });
        };

        tripScope.editTrip = function() {
            requestService.prepareService('PATCH', tripScope.currentTrip, tripScope.currentTrip.id);
            requestService.getHttpPromise().then(function(response) {
                if (response.status === 200) {
                    tripScope.currentTrip = null;
                }
            }).then(function(error){
                console.log(error);
            });
        };

        tripScope.deleteTrip = function(trip) {
            requestService.prepareService('DELETE', trip.currentTrip, trip.id);
            requestService.getHttpPromise().then(function(response) {
                if (response.status === 204) {
                    getTrips();
                }
            }).then(function(error){
                console.log(error);
            });
        };

        tripScope.cancel = function() {
            tripScope.currentTrip = null;
        };

        tripScope.isNewTrip = function() {
            return tripScope.trips.indexOf(tripScope.currentTrip) < 0;
        };

        function getTrips() {
            tripScope.currentTrip = null;
            tripScope.trips = [];
            requestService.get(true).then(function(response) {
                if (response.status === 200) {
                    tripScope.trips = response.data;
                }
            }).catch(function(error) {
                console.log(error);
            });
        }
    }
})();