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
            requestService.post(tripScope.currentTrip).then(function(response) {
                if (response.status === 201) {
                    getTrips();
                }
            }).then(function(error){
                console.log(error);
            });
        };

        tripScope.editTrip = function() {
            requestService.patch(tripScope.currentTrip).then(function(response) {
                if (response.status === 200) {
                    tripScope.currentTrip = null;
                }
            }).then(function(error){
                console.log(error);
            });
        };

        tripScope.deleteTrip = function(trip) {
            requestService.delete(trip.id).then(function(response) {
                if (response.status === 204) {
                    getTrips();
                }
            }).catch(function(error) {
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