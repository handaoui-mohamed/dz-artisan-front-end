(function () {
    'use strict';

    angular
        .module('app.auth',[])
        .config(config);

    function config($stateProvider) {
        $stateProvider.state('auth', {
            url: '/auth',
            controller: 'AuthController as vm',
            templateUrl: 'app/auth/auth.html'
        });
    }
})();