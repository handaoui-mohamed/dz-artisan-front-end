(function(){
    'use strict';

    angular
        .module('app.search')
        .controller('SearchController', SearchController);

    function SearchController($log, SearchService){
        var vm = this;
    }
})();