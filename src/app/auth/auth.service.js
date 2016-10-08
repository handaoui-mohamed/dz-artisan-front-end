(function () {
    'use strict';

    angular
        .module('app.auth')
        .factory('LoginService');

    function LoginService($resource, API_ENDPOINT) {
        return $resource(API_ENDPOINT + 'login');
    }

})();