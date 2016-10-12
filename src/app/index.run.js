(function () {
    'use strict';

    angular
        .module('app')
        .run(run);
    
    function run($auth, $log, $rootScope,$state, $location, $window, UserService) {
        var user_id = $window.localStorage['current_user'];
        if (user_id){
            UserService.get({userId: user_id}, function(data){
                $rootScope.current_user = data.element;
            }, function(errors){
                $log.error(errors);
            });
        }       

        $rootScope.$on('$stateChangeStart', function (event, toState) {
            var notAllowedStates = ['/login', '/forget-password'];

            if (notAllowedStates.indexOf($location.url()) === -1)
                $rootScope.next = $location.url();

            if ($auth.isAuthenticated()) {
                if (notAllowedStates.indexOf(toState['url']) !== -1) {
                    event.preventDefault();
                    $state.go('home');
                }
            } else {
                if (toState['loginRequired']) {
                    event.preventDefault();
                    $state.go('login');
                }
            }
        });
    }
})();