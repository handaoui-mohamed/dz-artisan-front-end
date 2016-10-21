(function(){
    'use strict';

    angular
        .module('app.user_info')
        .controller('UserInfoController', UserInfoController);

    function UserInfoController($log, UserService, $stateParams, $state, ErrorToast){
        var vm = this;

        vm.default_profile_image = "assets/images/avatar.png";

        UserService.get({userId: $stateParams.username}, function(data){
            vm.user = data.element;
        }, function(errors){
            $state.go('search');
            ErrorToast(errors);
        });
    }
})();
