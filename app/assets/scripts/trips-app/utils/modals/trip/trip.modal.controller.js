(function() {
    'use strict';

    angular.module('tripsApp').controller('tripController', newTripCtrlFn);

    newTripCtrlFn.$inject = ['$mdDialog', 'NgMap', 'FileUploader', 'userSession'];
    function newTripCtrlFn($mdDialog, NgMap, FileUploader, userSession) {
        var newTripScope = this;
        newTripScope.trip = {
            title: '',
            description: '',
            image: '',
            lng: 0,
            lat: 0
        };
        newTripScope.uploader = new FileUploader({
            url: 'http://localhost:3000/api/images',
            headers: {
                Authorization: userSession.user.token
            },
            autoUpload: true,
            withCredentials: true
        });
        newTripScope.searchQuery = 'Mexico';
        newTripScope.mapInstance = null;

        newTripScope.uploader.onSuccessItem = function(fileItem, response, status, headers) {
            console.info('onSuccessItem', fileItem, response, status, headers);
        };

        newTripScope.searchLocation = function(address) {
            var coordinates = newTripScope.mapInstance.getCenter();
            if (coordinates) {
                newTripScope.trip.lat = coordinates.lat();
                newTripScope.trip.lng = coordinates.lng();
            }
        };

        newTripScope.cancel = function() {
            $mdDialog.cancel();
        };

        newTripScope.hide = function() {
            newTripScope.trip.location = newTripScope.searchQuery;
            $mdDialog.hide(newTripScope.trip);
        };

        NgMap.getMap('tripMap').then(function(map) {
            newTripScope.mapInstance = map;
        });
    }
})();