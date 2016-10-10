(function () {
    'use strict';

    angular
        .module('app')
        .controller('AppController', AppController);
    
    function AppController($log, $auth, $window) {
        var vm = this;

        vm.logout = logout;

        function logout(){
            $window.localStorage.removeItem('current_user');
            $auth.logout();
        }
    }
})();