(function(){
    'use strict';

    angular
        .module('app')
        .directive("fallbackSrc", fallbackSrc);

    function fallbackSrc(){
        var fallbackSrc = {
            link: function postLink(scope, iElement, iAttrs) {
                iElement.bind('error', function() {
                    angular.element(this).attr("src", iAttrs.fallbackSrc);
                });
            }
        }
        return fallbackSrc;
    }
})();