(function () {
    "use strict";

    angular
        .module("cliApp")
        .config(configBlock);

    function configBlock($stateProvider, $urlRouterProvider, $locationProvider, $httpProvider) {
        // here is your config Block, it will exec before runBlock

        $urlRouterProvider.otherwise('/');
        $locationProvider.html5Mode(true).hashPrefix('!');
        $httpProvider.interceptors.push('requestError');
        $httpProvider.interceptors.push('shadow');
    }
})();