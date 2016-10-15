(function(){
    'use strict';

    angular
        .module('app.search')
        .controller('SearchController', SearchController);

    function SearchController($log, $rootScope, SearchService, UserService, JobService){
        var vm = this;

        vm.users = [];
        vm.jobs = [];
        vm.pages = [];
        vm.selectedJobs = [];
        vm.current_page = 1;
        vm.default_profile_image = "assets/images/avatar.png"

        JobService.get(function(data){
            vm.jobs = data.elements;

            var search = $rootScope.search;
            if (search){
                $log.info(search);
                vm.searchInput = search.input;
                vm.selectedJobs = search.jobs;
                getUsers();
                delete $rootScope.search;
            }else{
                getUsers();
            }
        });

        vm.getUsers = getUsers;
        vm.nextPage = nextPage;
        vm.previousPage = previousPage;
        vm.changePage = changePage;

        function changePage(PageNumber){
            if (PageNumber !== vm.current_page){
                vm.current_page = PageNumber;
                getUsers();
            }
        }

        function previousPage(){
            if(vm.current_page > 1){
                vm.current_page--;
                getUsers();
            }
        }

        function nextPage(){
            if(vm.current_page < vm.pages.length){
                vm.current_page++;
                getUsers();
            }
        }

        function getUsers(){
            var searchParams = {
                jobs: vm.selectedJobs, 
                searchInput: vm.searchInput, 
                limit:12
            }

            SearchService.search({page: vm.current_page}, searchParams, function(data){
                vm.users = data.elements;
                vm.pages = [];
                for (var i = 0; i < data.total_pages; i++) {
                    vm.pages.push(i);   
                }
            });
        }
    }
})();