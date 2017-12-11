(function() {
    'use strict';

    angular.module('tripsApp').controller('newTripController', newTripCtrlFn);

    newTripCtrlFn.$inject = ['NgMap'];
    function newTripCtrlFn(NgMap) {
        var newTripScope = this;
        newTripScope.trip = {
            title: '',
            description: '',
            blobImage: '',
            lng: 0,
            lat: 0
        };
        newTripScope.searchQuery = 'Mexico';
        newTripScope.mapInstance = null;
        newTripScope.searchLocation = function(address) {
            newTripScope.trip.lat = newTripScope.mapInstance.getCenter().lat();
            newTripScope.trip.lng = newTripScope.mapInstance.getCenter().lng();
        };

        NgMap.getMap('tripMap').then(function(map) {
            newTripScope.mapInstance = map;
        });
    }
})();