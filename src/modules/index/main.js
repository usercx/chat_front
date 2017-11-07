(function () {
    "use strict";

    angular
        .module("cliApp")
        .controller("indexCtrl", indexCtrl);

    function indexCtrl($state) {
        let vm = this;
        vm.go = function(state){
            $state.go(state);
        };
    }
})();