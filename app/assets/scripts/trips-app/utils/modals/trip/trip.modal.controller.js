(function() {
    'use strict';

    angular.module('tripsApp').controller('tripController', newTripCtrlFn);

    newTripCtrlFn.$inject = ['$mdDialog', '$timeout', 'APP_CONFIG', 'FileUploader', 'googleMapsService', 'userSession', 'currentTrip'];
    function newTripCtrlFn($mdDialog, $timeout, APP_CONFIG, FileUploader, googleMapsService, userSession, currentTrip) {
        var newTripScope = this;
        newTripScope.trip = (currentTrip) ? currentTrip : {
            title: '',
            description: '',
            image_id: 0,
            lng: 0,
            lat: 0
        };
        newTripScope.uploader = new FileUploader({
            url: APP_CONFIG.SERVER_URL + APP_CONFIG.IMAGES_ENDPOINT,
            headers: {
                Authorization: userSession.user.token
            },
            autoUpload: true,
            withCredentials: true,
            queueLimit: 1
        });
        newTripScope.searchQuery = 'Mexico';

        newTripScope.uploader.onBeforeUploadItem = function(item) {
            newTripScope.uploader.queue[0].alias = 'image';
        };

        newTripScope.uploader.onSuccessItem = function(fileItem, response, status, headers) {
            newTripScope.trip.image_name = response.id + response.name;
        };

        newTripScope.searchLocation = function(address) {
            googleMapsService.setLocation(address);
            var coord = googleMapsService.getCoordinates();
            newTripScope.trip.lat = coord.lat();
            newTripScope.trip.lng = coord.lng();
        };

        newTripScope.setCoordinates = function() {
            if (newTripScope.trip.lat && newTripScope.trip.lng) {
                googleMapsService.setCoordinates(newTripScope.trip.lat, newTripScope.trip.lng);
            }
        };

        newTripScope.cancel = function() {
            $mdDialog.cancel();
        };

        newTripScope.hide = function() {
            newTripScope.trip.location = newTripScope.searchQuery;
            $mdDialog.hide(newTripScope.trip);
        };

        $timeout(function() {
            googleMapsService.init('tripMap');
        }, 0);
    }
})();