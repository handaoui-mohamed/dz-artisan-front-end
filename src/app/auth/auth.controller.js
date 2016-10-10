(function () {
    'use strict';

    angular
        .module('app.auth')
        .controller('AuthController', AuthController);

    function AuthController($log, $auth, $window, $location, $rootScope, RegisterService) {
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
                vm.login()
            }, function(error){
                $log.log(error)
            });
        }

        function login(){
            vm.disableSubmit = true;
            $auth.login(vm.user).then(function (response) {
                $log.log(response);
                if (!response.data.errors) {
                    $window.localStorage['current_user'] = response.data.user.id;
                    $rootScope.current_user = response.data.user;
                    $location.path('/');
                }
                vm.disableSubmit = false;
            }, function (errors) {
                $log.log(errors);
                vm.disableSubmit = false;
            });
        }
    }
})();