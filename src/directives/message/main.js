(function(){
    "use strict";

    angular
    .module("cliApp")
    .directive("cliMessage", cliMessage);

    function cliMessage(){
        return {
            templateUrl: "directives/message/main.html",
            restrict: "E",
            scope: {
                config: "="
            },
            controller: function($scope){
                let $ctrl = this;
                $ctrl.config = Object.assign({}, $scope.config);
            },
            controllerAs: "$ctrl"
        };
    }
})();