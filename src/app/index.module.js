(function () {
    'use strict';

    angular
        .module('app',[
            'ngSanitize',
            'ui.router',
            'ngResource',
            'ngAnimate', 
            'ngCookies', 
            'ngTouch',
            'ngMessages', 
            'ngAria', 
            'ui.bootstrap',
            'toastr',

            /* app module*/
            'app.auth'
        ]);
})();