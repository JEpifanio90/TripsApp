(function() {
    'use strict';

    angular.module('tripsApp').controller('tripsController', tripsCtrlFn);

    tripsCtrlFn.$inject = ['$mdDialog', 'APP_CONFIG', 'requestService'];
    function tripsCtrlFn($mdDialog, APP_CONFIG, requestService) {
        var tripScope = this;
        tripScope.trips = [];
        tripScope.currentTrip = null;
        getTrips();

        tripScope.createTrip = function() {
            showModal('POST', 'tripController', 'tripCtrl');
        };

        tripScope.editTrip = function(trip) {
            showModal('PATCH', 'tripController', 'tripCtrl', undefined, trip);
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

        function showModal(method, controller, controllerAlias, ev, params) {
            var modalOptions = {
                controller: controller,
                controllerAs: controllerAlias,
                templateUrl: APP_CONFIG.NEW_TRIP_MODAL_VIEW,
                parent: angular.element(document.body),
                targetEvent: ev,
                clickOutsideToClose: true,
                escapeToClose: true
            };

            if (params)
                modalOptions.locals = { currentTrip: params };
            console.log(modalOptions);
            $mdDialog.show(modalOptions).then(function(trip) {
                sendData(method, trip);
            }, function() { });
        }

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

        function sendData(method, trip) {
            switch (method) {
                case 'POST':
                    requestService.post(trip).then(function(response) {
                        if (response.status === 201) {
                            getTrips();
                        }
                    }).then(function(error){
                        console.log(error);
                    });
                break;

                case 'PATCH':
                    requestService.patch(trip).then(function(response) {
                        if (response.status === 200) {
                            tripScope.currentTrip = null;
                        }
                    }).then(function(error){
                        console.log(error);
                    });
                break;
            }
        }
    }
})();