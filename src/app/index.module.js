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
            'ui.multiselect',
            'toastr',

            /* app module*/
            'app.auth',
            'app.profile',
            'app.search'
        ]);
})();