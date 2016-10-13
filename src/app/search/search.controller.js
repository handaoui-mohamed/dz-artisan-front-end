(function(){
    'use strict';

    angular
        .module('app.search')
        .controller('SearchController', SearchController);

    function SearchController($log, SearchService, UserService){
        var vm = this;

        vm.users = [];

        UserService.get(function(data){
            vm.users = data.elements;
        }, function(errors){
            $log.error(errors);
        })
    }
})();