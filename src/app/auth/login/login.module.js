(function () {
    'use strict';

    angular
        .module('app.login',[])
        .config(config);

    function config($stateProvider) {
        $stateProvider.state('login', {
            url: '/login',
            controller: 'LoginController as loginVm',
            templateUrl: 'app/auth/login/login.html'
        });
    }
})();