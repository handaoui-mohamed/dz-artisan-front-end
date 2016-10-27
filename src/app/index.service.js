(function(){
    'use strict';

    angular
        .module('app')
        .factory('UserService', UserService)
        .factory('JobService', JobService)
        .factory('ErrorToast', ErrorToast);

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


    function ErrorToast(toastr){
        return function(errors){
            switch (errors.status){
                case 400:
                    for (var fieldName in errors.data['form_errors']) {
                        if (errors.data['form_errors'].hasOwnProperty(fieldName)) {
                            toastr.warning(errors.data['form_errors'][fieldName][0]);
                            break;
                        }
                    }
                break;
                case 404:
                    toastr.warning("Le contenu que vous avez demandé n'existe pas");
                break;
                case 401:
                    toastr.warning('Vous n\'avez pas le droit d\'effectuer cette opération.');
                break;
                case 500:
                    toastr.error('Service inaccessible pour le moment.');
                break;
            }
        }
    }
})();
