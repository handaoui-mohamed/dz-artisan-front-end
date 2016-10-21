(function () {
    'use strict';

    angular
        .module('app.auth')
        .controller('AuthController', AuthController);

    function AuthController($log, $auth, $window, $state, $rootScope, RegisterService, toastr) {
        var vm = this;

        vm.register = false;
        vm.loginUser = loginUser;
        vm.registerUser = registerUser;

        function registerUser(){
            vm.disableSubmit = true;
            toastr.clear([toastr]);
            RegisterService.save(vm.user,function(){
                vm.loginUser();
                toastr.success('Connexion en cours ...', 'Création de compte avec succee:');
            }, function(){
                toastr.error('Le nom d\'utilisateur exite déja', 'Error lors de la Création de votre compte:');
                vm.disableSubmit = false;
            });
        }

        function loginUser(){
            vm.disableSubmit = true;
            toastr.clear([toastr]);
            $auth.login(vm.user).then(function (response) {
                if (!response.data.errors) {
                    toastr.success('Redirection vers votre profil ...', 'Bonjour '+
                    (response.data.user.full_name || response.data.user.username)+':');
                    $window.localStorage['current_user'] = response.data.user.id;
                    $rootScope.current_user = response.data.user;
                    $state.go('profile');
                }else{
                     toastr.error('Le nom d\'utilisateur ou mot de passe incorrect!', 'Error de connexion:');
                }
                vm.disableSubmit = false;
            }, function () {
                toastr.error('Le nom d\'utilisateur ou mot de passe incorrect!', 'Error de connexion:');
                vm.disableSubmit = false;
            });
        }
    }
})();