(function() {
    'use strict';

    angular.module('tripsApp').service('googleMapsService', mapServiceFn);

    mapServiceFn.$inject = [];
    function mapServiceFn() {
        var mapScope = this;
        mapScope.map = {};
        mapScope.markers = [];
        mapScope.location = { lat: 40.7127837, lng: -74.00594130000002 };

        mapScope.init = function(mapId) {
            var options = {
                // center: new google.maps.LatLng(40.7127837, -74.00594130000002),
                center: { lat: mapScope.location.lat, lng: mapScope.location.lng },
                zoom: 8,
                disableDefaultUI: false    
            };

            mapScope.map = new google.maps.Map(document.getElementById(mapId), options);
        };

        mapScope.setLocation = function(tripLat, tripLng) {
            mapScope.map.setCenter({lat: tripLat, lng: tripLng});
        };

        mapScope.getCoordinates = function() {
            return mapScope.map.getCenter();
        };

        mapScope.createMarker = function(trip) {
           var marker = new google.maps.Marker({
               position: {lat: trip.lat, lng: trip.lng},
               map: mapScope.map,
               title: trip.name,
               animation: google.maps.Animation.DROP
            });
           google.maps.event.addListener(marker, 'click', function() {
            //    closeAllInfoWindows();
               animate(marker);
               marker.infowindow = new google.maps.InfoWindow({
                   content: '<md-content layout="row" style="height: 350px; width: 400px;"><h1 flex="100" class="firstHeading">' + trip.title + '</h1>' +
                   '<div flex="20"><p><b>' + trip.title + ' :</b>' + trip.description + '</p></div>' +
                   '<div flex="80"><img style="height: 100%; width: 100%;" src="/images/' + trip.image_name + '"></div></md-content>'
                });
                marker.infowindow.open(this.map, this);
            });

            mapScope.markers.push (marker);
        };

        function animate(marker) {
            if (marker.getAnimation() !== null) {
                marker.setAnimation(null);
            } else {
                marker.setAnimation(google.maps.Animation.BOUNCE);
            }
        }

        // function closeAllInfoWindows() {
        //     mapScope.markers.forEach(function (marker) {
        //         if (marker.infowindow) {
        //             marker.infoWindow.close();
        //         }
        //     });
        // }
    }
})();