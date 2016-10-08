(function () {
    'use strict';

    angular
        .module('app')
        .run(run);
    
    function run($rootScope,$state, $location) {
        $rootScope.$on('$stateChangeStart', function (event, toState) {
            console.log('state change!')
        });
    }
})();