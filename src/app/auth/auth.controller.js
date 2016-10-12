(function () {
    'use strict';

    angular
        .module('app.auth')
        .controller('AuthController', AuthController);

    function AuthController($log, $auth, $window, $state, $rootScope, RegisterService) {
        var vm = this;

        vm.login = login;
        vm.register = register;

        function register(){
            RegisterService.save(vm.user,function(){
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
                    $state.go('profile');
                }
                vm.disableSubmit = false;
            }, function (errors) {
                $log.log(errors);
                vm.disableSubmit = false;
            });
        }
    }
})();