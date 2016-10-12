(function(){
    'use strict';

    angular
        .module('app.profile')
        .controller('ProfileController', ProfileController);

    function ProfileController($log, ProfileService, JobService, Upload, API_ENDPOINT, FileService){
        var vm = this;
        vm.jobs = [];
        vm.progressPercentage = 0;
        vm.uploadPercentage = 0;
        vm.default_profile_image = "assets/images/avatar.png"        

        ProfileService.get(function(data){
            vm.profile = data.element;
            if (vm.profile.profile_image.length > 1) {
                vm.profile_image = vm.profile.profile_image[0]; 
            }
            $log.info(vm.profile);

            JobService.get(function(data){
                vm.jobs = data.elements;

                vm.profile.jobs.forEach(function(user_job){
                    var selected_job = vm.jobs.find(function(job){return user_job.id === job.id});
                    if (selected_job) selected_job.selected = true;
                });
                $log.info(vm.jobs);
            }, function(errors){
                $log.error(errors);
            });
        }, function(errors){    
            $log.error(errors)
        })

        vm.updateProfile = updateProfile;
        vm.uploadProfilePicture = uploadProfilePicture;
        vm.uploadJobPictures = uploadJobPictures;
        vm.deleteFile = deleteFile;

        function updateProfile(){
            vm.profile.jobs = [];
            vm.jobs.forEach(function(job){
                if(job.selected){
                    vm.profile.jobs.push(job.id);
                }
            });
            $log.info(vm.profile);
            ProfileService.update(vm.profile,function(data){
                vm.profile = data.element;
                $log.info(vm.profile);
            }, function(error){
                $log.error(error);
            });
        }

        function uploadProfilePicture(file) {
            vm.file = file;
            Upload.upload({
                url: API_ENDPOINT+'upload/profile',
                data: {profile_image: file}
            }).then(function (resp) {
                vm.profile = resp.data.element;
                if (vm.profile.profile_image.length > 1) {
                    vm.profile_image = vm.profile.profile_image[0]; 
                }
            }, function (resp) {
                $log.warn('Error status: ' + resp.status);
            }, function (evt) {
                vm.progressPercentage = parseInt(100.0 * evt.loaded / evt.total);
            });
        }

         function uploadJobPictures(file) {
            Upload.upload({
                url: API_ENDPOINT+'upload',
                data: {file: file}
            }).then(function (resp) {
                vm.profile = resp.data.element;
            }, function (resp) {
                $log.warn('Error status: ' + resp.status);
            }, function (evt) {
                vm.uploadPercentage = parseInt(100.0 * evt.loaded / evt.total);
            });
        }

        function deleteFile(fileId, index){
            FileService.delete({fileId: fileId}, function(){
                vm.profile.files.splice(index, 1);
            }, function(errors){
                $log.error(errors);
            });
        }
    }
})();