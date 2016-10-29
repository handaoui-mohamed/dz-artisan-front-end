(function(){
    'use strict';

    angular
        .module('app.profile')
        .controller('ProfileController', ProfileController);

    function ProfileController($log, ProfileService, JobService, Upload, API_ENDPOINT, FileService, ErrorToast, toastr){
        var vm = this;
        vm.jobs = [];
        vm.progressPercentage = 0;
        vm.uploadPercentage = 0;
        vm.default_profile_image = "assets/images/avatar.png"

        ProfileService.get(function(data){
            vm.profile = data.element;
            $log.info(vm.profile);
            if (vm.profile.profile_image.length > 0) {
                vm.profile_image = vm.profile.profile_image[0];
            }

            JobService.get(function(data){
                vm.jobs = data.elements;

                vm.profile.jobs.forEach(function(user_job){
                    var selected_job = vm.jobs.find(function(job){return user_job.id === job.id});
                    if (selected_job) selected_job.selected = true;
                });
            }, function(errors){
                ErrorToast(errors);
            });
        }, function(errors){
            ErrorToast(errors)
        })

        vm.updateProfile = updateProfile;
        vm.uploadProfilePicture = uploadProfilePicture;
        vm.uploadJobPictures = uploadJobPictures;
        vm.deleteFile = deleteFile;
        vm.placeChanged = placeChanged;

        function placeChanged() {
            var place = this.getPlace().geometry.location;
            vm.profile.latitude = place.lat();
            vm.profile.longitude = place.lng();
        }


        function updateProfile(){
            vm.disabled = true;
            vm.profile.jobs = [];
            vm.jobs.forEach(function(job){
                if(job.selected){
                    vm.profile.jobs.push(job.id);
                }
            });
            $log.info(vm.profile);
            ProfileService.update(vm.profile,function(data){
                vm.profile = data.element;
                toastr.info('Votre profile a été mis a jour');
                vm.disabled = false;
            }, function(error){
                ErrorToast(error);
                vm.disabled = false;
            });
        }

        function uploadProfilePicture(file) {
            vm.file = file;
            Upload.upload({
                url: API_ENDPOINT+'upload/profile',
                data: {profile_image: file}
            }).then(function (resp) {
                vm.profile.profile_image = resp.data.element.profile_image;
                if (vm.profile.profile_image.length > 0) {
                    vm.profile_image = vm.profile.profile_image[0];
                }

                toastr.info('Votre photo de profile à été charger');
            }, function (resp) {
                ErrorToast(resp);
            }, function (evt) {
                vm.progressPercentage = parseInt(100.0 * evt.loaded / evt.total);
            });
        }

         function uploadJobPictures(file) {
            Upload.upload({
                url: API_ENDPOINT+'upload',
                data: {file: file}
            }).then(function (resp) {
                vm.profile.files = resp.data.element.files;
                toastr.info('Votre photo a été charger');
            }, function (resp) {
                ErrorToast(resp);
            }, function (evt) {
                vm.uploadPercentage = parseInt(100.0 * evt.loaded / evt.total);
            });
        }

        function deleteFile(fileId, index){
            FileService.delete({fileId: fileId}, function(){
                vm.profile.files.splice(index, 1);
                toastr.info('Votre photo a été supprimer');
            }, function(errors){
                ErrorToast(errors);
            });
        }
    }
})();
