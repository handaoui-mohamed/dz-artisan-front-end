(function () {
    'use strict';

    angular
        .module('app.login',[])
        .config(config);

    angular.$inject = ['$stateProvider'];

    function config($stateProvider) {
        $stateProvider.state('login', {
            url: '/login',
            views:{
                'main@':{
                    controller: 'LoginController as loginVm',
                    templateUrl: 'app/auth/login/login.html'
                }
            }
        });
    }
})();