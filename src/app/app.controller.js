(function () {
    'use strict';

    angular
        .module('app')
        .controller('AppController', AppController);
    
    function AppController() {
        console.log('working');
    }
})();