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
        $urlRouterProvider.otherwise('/');
    }
})();