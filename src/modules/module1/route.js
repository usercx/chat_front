(function () {
    "use strict";

    angular
        .module("cliApp")
        .config(routeConfig);

    function routeConfig($stateProvider) {
        $stateProvider
            .state("chatroom", {
                "url": "/",
                templateUrl: "modules/module1/main.html",
                controller: "module1Ctrl",
                controllerAs: "vm"
            });
    }
})();