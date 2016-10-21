(function () {
    'user strict';
    angular
        .module('app')
        .controller('MainController', MainController);

    function MainController($rootScope, $state, JobService, ErrorToast) {
        var vm = this;
        
        vm.jobs = [];

        JobService.get(function(data){
            vm.jobs = data.elements;
        }, function(errors){
            ErrorToast(errors);
        });

        vm.search = search;
        vm.placeChanged = placeChanged;

        function placeChanged() {
            var place = this.getPlace().geometry.location;
            vm.location = {
                latitude: place.lat(),
                longitude: place.lng()
            }
        }

        function search(){
            $rootScope.search = {
                jobs: vm.selectedJobs,
                input: vm.searchInput,
                location: vm.location
            };
            $state.go('search');
        }
    }
})();