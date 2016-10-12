(function(){
    'use strict';

    angular
        .module('app.search')
        .factory('SearchService', SearchService);

    function SearchService($resource, API_ENDPOINT){
        return $resource(API_ENDPOINT + "search", {}, {
            'search':{
                method: 'POST',
                isArray: false
            }
        })
    }
})();