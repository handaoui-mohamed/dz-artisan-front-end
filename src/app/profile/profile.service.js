(function(){
    'use strict';

    angular
        .module('app.profile')
        .factory('ProfileService', ProfileService)
        .factory('FileService', FileService);

    function ProfileService($resource, API_ENDPOINT){
        return $resource(API_ENDPOINT + 'profile', {},{
            'get':{
                method: 'GET',
                isArray: false
            },
            'update' :{
                method :'PUT'
            }
        });
    }

    function FileService($resource, API_ENDPOINT){
        return $resource(API_ENDPOINT + 'uploads/:fileId', {fileId: '@id'}, {
            'delete':{
                method: 'DELETE'
            }
        })
    }
})();