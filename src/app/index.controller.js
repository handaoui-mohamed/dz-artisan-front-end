(function () {
    'use strict';

    angular
        .module('app')
        .controller('AppController', AppController);

    function AppController($log, $auth, $window, $rootScope, $state){
        var vm = this;

        vm.logout = logout;
        vm.state = $state;

        function logout(){
            $window.localStorage.removeItem('current_user');
            $auth.logout();
            delete $rootScope.current_user;
            $state.go('auth');
        }
    }
})();
