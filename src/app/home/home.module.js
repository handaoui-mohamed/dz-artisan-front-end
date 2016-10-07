(function () {
    'use strict';

    angular
        .module('app.home',[])
        .config(config);

    angular.$inject = ['$stateProvider'];

    function config($stateProvider) {
        $stateProvider.state('home', {
            url: '/',
            views:{
                'main@':{
                    controller: 'HomeController as homeVm',
                    templateUrl: 'app/home/home.html'
                }
            }
        });
    }
})();