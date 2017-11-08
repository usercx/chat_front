(function () {
    "use strict";

    angular
        .module("cliApp")
        .controller("indexCtrl", indexCtrl);

    function indexCtrl($state) {
        let vm = this;
        document.title = "小久欢迎您~";
        vm.go = function(state){
            $state.go(state);
        };
    }
})();