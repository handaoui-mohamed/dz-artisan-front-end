(function () {
    'use strict';

    angular
        .module('app.login')
        .controller('LoginController', LoginController);

    function LoginController() {
        console.log('login controller');
    }
})();