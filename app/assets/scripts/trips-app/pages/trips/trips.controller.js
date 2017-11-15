(function() {
    'use strict';

    angular.module('tripsApp').controller('tripsController', tripsCtrlFn);

    tripsCtrlFn.$inject = ['APP_CONFIG', 'requestService', 'userSession'];
    function tripsCtrlFn(APP_CONFIG, requestService, userSession) {
        var tripScope = this;
        tripScope.trips = [];
        requestService.headers = { Authorization: userSession.user.token };
        requestService.url = APP_CONFIG.TRIPS_ENDPOINT;
        requestService.method = 'GET';

        requestService.getHttpPromise().then(function(response) {
            if (response.status === 200) {
                tripScope.trips = response.data;
            }
        }).catch(function(error) {
            console.log(error);
        });

    }
})();