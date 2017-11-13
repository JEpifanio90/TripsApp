(function() {
    'use strict';

    angular.module('tripsApp').config(routerFn);

    routerFn.$inject = ['$stateProvider', '$urlRouterProvider', 'APP_CONFIG'];
    function routerFn($stateProvider, $urlRouterProvider, APP_CONFIG) {
        
        var homeState = {
            name: 'home',
            url: '/home',
            templateUrl: APP_CONFIG.HOME_VIEW,
            controller: "homeController",
            controllerAs: "homeCtrl",
        };

        var loginState = {
            name: 'login',
            url: '/login',
            templateUrl: APP_CONFIG.LOGIN_VIEW,
            controller: "loginController",
            controllerAs: "loginCtrl",
        };


        // var statesState = {
        //     name: 'states',
        //     url: '/states',
        //     templateUrl: APP_CONFIG.STATES_VIEW,
        //     controller: "entityController",
        //     controllerAs: "statesCtrl",
        //     params: {
        //         'urlVerb': 'states', 
        //         'create_success': 'created the state', 
        //         'create_failure': 'creating the state', 
        //         'update_success': 'updated the state\'s name', 
        //         'update_failure': 'updating the state\'s name', 
        //         'delete_success': 'deleted the state', 
        //         'delete_failure': 'deleting the state'
        //     }
        // };

        $stateProvider.state(loginState);
        $stateProvider.state(homeState);
        $urlRouterProvider.otherwise('/login');
    }
})();