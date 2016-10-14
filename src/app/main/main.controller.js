(function () {
    'user strict';
    angular
        .module('app')
        .controller('MainController', MainController);

    function MainController($rootScope, $state) {
        var vm = this;
        
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