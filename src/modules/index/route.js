(function () {
    "use strict";

    angular
        .module("cliApp")
        .config(routeConfig);

    function routeConfig($stateProvider) {
        $stateProvider
            .state("index", {
                "url": "/",
                templateUrl: "modules/index/main.html",
                controller: "indexCtrl",
                controllerAs: "vm"
            });
    }
})();