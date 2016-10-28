(function(){
    'use strict';

    angular
        .module("app.contact")
        .controller("ContactController", ContactController);

    function ContactController($log, ContactService, toastr,ErrorToast){
        var vm = this;
        vm.mail = {};

        vm.send = send;

        function send(){
            ContactService.save(vm.mail, function(){
                toastr.success("Votre message a été envoyer, Merci");
            }, function(errors){
                ErrorToast(errors);
            });
        }
    }
})();
