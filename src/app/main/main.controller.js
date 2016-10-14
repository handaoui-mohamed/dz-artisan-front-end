(function () {
    'user strict';
    angular
        .module('app')
        .controller('MainController', MainController);

    function MainController($rootScope, $state, JobService) {
        var vm = this;
        
        vm.jobs = [];

        JobService.get(function(data){
            vm.jobs = data.elements;
        });

        vm.search = search;

        function search(){
            $rootScope.search = {
                jobs: vm.selectedJobs,
                input: vm.searchInput
            };
            $state.go('search');
        }
    }
})();