(function(){
    'use strict';

    angular
        .module('app.profile', [])
        .config(config);

    function config($stateProvider){
        $stateProvider.state('profile', {
            url: '/profile',
            controller: 'ProfileController as vm',
            templateUrl: 'app/profile/profile.html',
            loginRequired: true
        });
    }
})();