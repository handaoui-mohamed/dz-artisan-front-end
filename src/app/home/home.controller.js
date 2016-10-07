(function () {
    'user strict';
    angular
        .module('app.home')
        .controller('HomeController', HomeController);

    function HomeController(params) {
        console.log("home controller")
    }
})();