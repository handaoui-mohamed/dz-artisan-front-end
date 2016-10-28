(function () {
    'use strict';

    angular
        .module('app')
        .config(config);

    function config($stateProvider, $locationProvider, $urlRouterProvider, toastrConfig) {
        $locationProvider.html5Mode(true).hashPrefix('!');
        $stateProvider.state('home', {
            url: '/',
            controller: 'MainController as vm',
            templateUrl: 'app/main/main.html'
        });
        $urlRouterProvider.otherwise('/');

        angular.extend(toastrConfig, {
            autoDismiss: true,
            containerId: 'toast-container',
            maxOpened: 1,
            newestOnTop: true,
            positionClass: 'toast-bottom-left',
            preventDuplicates: false,
            preventOpenDuplicates: false,
            target: 'body',
            closeButton: true,
            extendedTimeOut: 1000,
            iconClasses: {
                error: 'toast-error',
                info: 'toast-info',
                success: 'toast-success',
                warning: 'toast-warning'
            }
        });
    }
})();
