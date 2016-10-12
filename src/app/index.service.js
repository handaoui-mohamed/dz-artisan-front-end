(function(){
    'use strict';

    angular
        .module('app')
        .factory('UserService', UserService)
        .factory('JobService', JobService);

    function UserService($resource, API_ENDPOINT){
        return $resource(API_ENDPOINT + 'users/:userId', {userId: '@id'},{
            'get':{
                method: 'GET',
                isArray: false
            },
            'update' :{
                method :'PUT'
            }
        });
    }

    function JobService($resource, API_ENDPOINT){
        return $resource(API_ENDPOINT + 'jobs/:jobId', {jobId: '@id'},{
            'get':{
                method: 'GET',
                isArray: false
            },
            'update':{
                method: 'PUT'
            }
        })
    }
})();