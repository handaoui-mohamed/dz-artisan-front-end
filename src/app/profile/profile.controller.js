(function(){
    'use strict';

    angular
        .module('app.profile')
        .controller('ProfileController', ProfileController);

    function ProfileController($log, ProfileService, Upload, API_ENDPOINT){
        var vm = this;
        vm.progressPercentage = 0;
        vm.default_profile_image = "assets/images/avatar.png"


        ProfileService.get(function(data){
            vm.profile = data.element;
            vm.profile_image = vm.profile.profile_image[vm.profile.profile_image.length - 1]; 
            $log.info(vm.profile);
        }, function(errors){    
            $log.error(errors)
        })

        vm.updateProfile = updateProfile;
        vm.uploadProfilePicture = uploadProfilePicture;


        function updateProfile(){
            $log.info(vm.profile);
            ProfileService.update(vm.profile,function(data){
                vm.profile = data.element;
                $log.info(vm.profile);
            }, function(error){
                $log.error(error);
            });
        }

        function uploadProfilePicture(file) {
            Upload.upload({
                url: API_ENDPOINT+'upload/profile',
                data: {profile_image: file}
            }).then(function (resp) {
                vm.profile = resp.data.element;
            }, function (resp) {
                $log.warn('Error status: ' + resp.status);
            }, function (evt) {
                vm.progressPercentage = parseInt(100.0 * evt.loaded / evt.total);
            });
        };
    }
})();