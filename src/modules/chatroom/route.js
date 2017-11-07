(function () {
    "use strict";

    angular
        .module("cliApp")
        .config(routeConfig);

    function routeConfig($stateProvider) {
        $stateProvider
            .state("chatroom", {
                "url": "/chatroom",
                templateUrl: "modules/chatroom/main.html",
                controller: "chatroomCtrl",
                controllerAs: "vm"
            });
    }
})();