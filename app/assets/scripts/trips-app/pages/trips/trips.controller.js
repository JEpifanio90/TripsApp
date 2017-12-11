(function() {
    'use strict';

    angular.module('tripsApp').controller('tripsController', tripsCtrlFn);

    tripsCtrlFn.$inject = ['$mdDialog', 'APP_CONFIG', 'requestService'];
    function tripsCtrlFn($mdDialog, APP_CONFIG, requestService) {
        var tripScope = this;
        tripScope.trips = [];
        tripScope.currentTrip = null;
        getTrips();

        tripScope.createTrip = function(ev) {
            $mdDialog.show({
                controller: 'newTripController',
                controllerAs: 'newTripCtrl',
                templateUrl: APP_CONFIG.NEW_TRIP_MODAL_VIEW,
                parent: angular.element(document.body),
                targetEvent: ev,
                clickOutsideToClose: true,
                escapeToClose: true
            }).then(function(answer) {
                // sendData(answer);
            }, function() { });
            // requestService.post(tripScope.currentTrip).then(function(response) {
            //     if (response.status === 201) {
            //         getTrips();
            //     }
            // }).then(function(error){
            //     console.log(error);
            // });
        };

        tripScope.editTrip = function() {
            // locals: 
            // requestService.patch(tripScope.currentTrip).then(function(response) {
            //     if (response.status === 200) {
            //         tripScope.currentTrip = null;
            //     }
            // }).then(function(error){
            //     console.log(error);
            // });
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