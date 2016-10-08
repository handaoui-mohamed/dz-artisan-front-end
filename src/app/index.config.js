(function () {
    'use strict';

    angular
        .module('app')
        .config(config);

    function config($stateProvider, $locationProvider, $urlRouterProvider) {
        $locationProvider.html5Mode(true).hashPrefix('!');
        $stateProvider.state('home', {
            url: '/',
            controller: 'MainController as homeVm',
            templateUrl: 'app/main/main.html'
        });

        $stateProvider.state('login', {
            url: '/login',
            controller: 'LoginController as loginVm',
            templateUrl: 'app/auth/login/login.html'
        });
        $urlRouterProvider.otherwise('/');
    }
})();