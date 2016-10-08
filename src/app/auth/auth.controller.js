(function () {
    'use strict';

    angular
        .module('app.auth')
        .controller('AuthController', AuthController);

    function AuthController() {
        var vm = this;

        vm.login = login;
        vm.register = register;

        function register(){
            console.log('register')
        }

        function login(){
            console.log('login')
            console.log('username', vm.username);
            console.log('password', vm.password);
            console.log('remember_me', vm.remember_me);
        }
    }
})();