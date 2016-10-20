(function(){
    'use strict';

    angular
        .module('app.user_info', [])
        .config(config);

    function config($stateProvider){
        $stateProvider.state('userprofile', {
            url: '/profile/:username',
            controller: 'UserInfoController as vm',
            templateUrl: 'app/user-info/user-info.html'
        });
    }
})();