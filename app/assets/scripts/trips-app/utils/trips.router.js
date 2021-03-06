(function() {
    'use strict';

    angular.module('tripsApp').config(routerFn);

    routerFn.$inject = ['$stateProvider', '$urlRouterProvider', 'APP_CONFIG'];
    function routerFn($stateProvider, $urlRouterProvider, APP_CONFIG) {

        var loginState = {
            name: 'login',
            url: '/login',
            templateUrl: APP_CONFIG.LOGIN_VIEW,
            controller: "loginController",
            controllerAs: "loginCtrl"
        };

        var homeState = {
            name: 'home',
            url: '/home',
            templateUrl: APP_CONFIG.HOME_VIEW,
            controller: "homeController",
            controllerAs: "homeCtrl"
        };

        var tripsState = {
            parent: 'home',
            name: 'trips',
            url: '/trips',
            templateUrl: APP_CONFIG.TRIPS_VIEW,
            controller: "tripsController",
            controllerAs: "tripsCtrl",
            resolve: {
                service: ['$state', 'requestService', 'userSession', function($state, requestService, userSession) {
                    if (userSession.user.role !== "Trips Manager" && userSession.user.role !== "master" )
                        $state.go('trips');
                    requestService.setService(APP_CONFIG.TRIPS_ENDPOINT, userSession.user.token);
                }]
            }
        };

        var usersState = {
            parent: 'home',
            name: 'users',
            url: '/users',
            templateUrl: APP_CONFIG.USERS_VIEW,
            controller: "usersController",
            controllerAs: "userCtrl",
            resolve: {
                service: ['$state', 'requestService', 'userSession', function($state, requestService, userSession) {
                    if (userSession.user.role !== "Trips Manager" && userSession.user.role !== "master" )
                        $state.go('trips');
                    requestService.setService(APP_CONFIG.USERS_ENDPOINT, userSession.user.token);
                }]
            }
        };

        var dashboard = {
            parent: 'home',
            name: 'dashboard',
            url: '/dashboard',
            templateUrl: APP_CONFIG.DASHBOARD_VIEW,
            controller: 'dashboardController',
            controllerAs: 'dashCtrl',
            resolve: {
                service: ['requestService', 'userSession', function(requestService, userSession) {
                    requestService.setService(APP_CONFIG.TRIPS_ENDPOINT, userSession.user.token);
                }]
            }
        };

        $stateProvider.state(loginState);
        $stateProvider.state(homeState);
        $stateProvider.state(dashboard);
        $stateProvider.state(tripsState);
        $stateProvider.state(usersState);
        $urlRouterProvider.otherwise('/login');
    }
})();