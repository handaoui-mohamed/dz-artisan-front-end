(function(){
    'use strict';

    angular
        .module("app.contact", [])
        .config(config);

    function config($stateProvider){
        $stateProvider.state('contact', {
            url: '/contact',
            controller: 'ContactController as vm',
            templateUrl: 'app/contact/contact.html'
        });
    }
})();
