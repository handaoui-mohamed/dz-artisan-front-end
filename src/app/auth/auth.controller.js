(function () {
    'use strict';

    angular
        .module('app.auth')
        .controller('AuthController', AuthController);

    function AuthController($auth, $window, $location, RegisterService) {
        var vm = this;
        vm.user = {
            username: 'handaoui_mohamed',
            password: '03041994',
            email: 'handaoui_mohamed1@gmail.com'
        }

        vm.login = login;
        vm.register = register;

        function register(){
            RegisterService.save(vm.user,function(data){
                console.log(data.element);
            }, function(error){
                console.log(error)
            });
        }

        function login(){
            vm.disableSubmit = true;
            $auth.login(vm.user).then(function (response) {
                if (!response.data.errors) {
                    $window.localStorage['current_user'] = response.data.user_id;
                    // $location.path('/');
                    $auth.setToken(response.data.token);
                }
                vm.disableSubmit = false;
            }, function (errors) {
                console.log(errors);
                vm.disableSubmit = false;
            });
        }
    }
})();