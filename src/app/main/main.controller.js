(function () {
    'user strict';
    angular
        .module('app')
        .controller('MainController', MainController);

    function MainController($log) {
        $log.info("home controller")
    }
})();