(function () {
    'use strict';

    angular
        .module('app')
        .config(config);
    
    angular.$inject = ['$locationProvider', '$urlRouterProvider'];

    function config($locationProvider, $urlRouterProvider) {
        $locationProvider.html5Mode(true).hashPrefix('!');
        $urlRouterProvider.otherwise('/');
    }
})();