(function(){
    'use strict';

    angular
        .module('app.search')
        .controller('SearchController', SearchController);

    function SearchController($scope, $log, $rootScope, SearchService, UserService, JobService){
        var vm = this;

        vm.users = [];
        vm.jobs = [];
        vm.pages = [];
        vm.selectedJobs = [];
        vm.current_page = 1;
        vm.line_elements = 3;
        vm.default_profile_image = "assets/images/avatar.png";

        JobService.get(function(data){
            vm.jobs = data.elements;

            var search = $rootScope.search;
            if (search){
                $log.info(search);
                vm.searchInput = search.input;
                vm.selectedJobs = search.jobs;
                vm.location = search.location;
                delete $rootScope.search;
                getUsers();
            }else{
                getUsers();
            }
        });

        vm.getUsers = getUsers;
        vm.nextPage = nextPage;
        vm.previousPage = previousPage;
        vm.changePage = changePage;
        vm.placeChanged = placeChanged;

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

        function placeChanged() {
            var place = this.getPlace().geometry.location;
            vm.location = {
                latitude: place.lat(),
                longitude: place.lng()
            }
        }

        function getUsers(){
            var searchParams = {
                jobs: vm.selectedJobs, 
                location: vm.location, 
                limit:12
            }

            $log.info(searchParams);
            SearchService.search({page: vm.current_page}, searchParams, function(data){
                vm.users = data.elements;
                vm.pages = new Array(data.total_pages);
                updateOnScreenChange();
            });
        }

        /*Jquery function for screen size*/
        function updateOnScreenChange(){
            changeElementAlignement();
            $(window).resize(function(){
                $scope.$apply(function(){
                    changeElementAlignement();
                });
            });
        }

        function changeElementAlignement(){
            var screenSize = window.innerWidth;
            if (screenSize >= 1200) vm.line_elements = 3;
            else if (screenSize >= 768) vm.line_elements = 2;
            else vm.line_elements = 1;
        }
    }
})();