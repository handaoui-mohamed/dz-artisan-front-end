(function () {
    'user strict';
    angular
        .module('app')
        .controller('MainController', MainController);

    function MainController() {
        console.log("home controller")
    }
})();