(function() {
    'use strict';

    angular.module('tripsApp').service('googleMapsService', mapServiceFn);

    mapServiceFn.$inject = ['$http'];
    function mapServiceFn($http) {
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

        mapScope.setCoordinates = function(tripLat, tripLng) {
            mapScope.map.setCenter({lat: tripLat, lng: tripLng});
        };

        mapScope.getCoordinates = function() {
            return mapScope.map.getCenter();
        };

        mapScope.setLocation = function(address) {
            if (address) {
                cleanUpMarkers();
                $http.get('https://maps.google.com/maps/api/geocode/json?address=' + address).then(function(response) {
                    if (response.status === 200 && response.data.results[0].geometry) {
                        var coordinates = response.data.results[0].geometry;
                        mapScope.setCoordinates(coordinates.location.lat, coordinates.location.lng);
                        var marker = new google.maps.Marker({
                            position: {lat: coordinates.location.lat, lng: coordinates.location.lng},
                            map: mapScope.map,
                            title: address,
                            animation: google.maps.Animation.DROP
                         });

                         mapScope.markers.push(marker);
                    }
                }).catch(function(error) {
                    console.log(error);
                });
            }
        };

        mapScope.createMarker = function(trip) {
            var marker = new google.maps.Marker({
                position: {lat: trip.lat, lng: trip.lng},
                map: mapScope.map,
                title: trip.name,
                animation: google.maps.Animation.DROP
            });
            google.maps.event.addListener(marker, 'click', function() {
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

        function cleanUpMarkers() {
            mapScope.markers.forEach(function(marker) {
                marker.setMap(null);
            });
            mapScope.markers = [];
        }
    }
})();