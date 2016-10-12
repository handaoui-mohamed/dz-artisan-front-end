(function(){
    'use strict';

    angular
        .module('app.search', [])
        .config(config);

    function config($stateProvider){
        $stateProvider.state('search', {
            url: '/search',
            controller: 'SearchController as vm',
            templateUrl: 'app/search/search.html'
        });
    }
})();