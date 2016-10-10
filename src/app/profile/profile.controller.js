(function(){
    'use strict';

    angular
        .module('app.profile')
        .controller('ProfileController', ProfileController);

    function ProfileController($log, ProfileService){
        var vm = this;
        ProfileService.get(function(data){
            vm.profile = data.element;
            $log.info(vm.profile);
        }, function(errors){    
            $log.error(errors)
        })
    }
})();