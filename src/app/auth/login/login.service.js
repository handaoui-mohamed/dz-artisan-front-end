(function () {
    'use strict';

    angular
        .module('app.login')
        .factory('LoginService');

    angular.$inject = ['$resource', 'API_ENDPOINT'];

    function LoginService($resource, API_ENDPOINT) {
        return $resource(API_ENDPOINT + 'login/');
    }

})();