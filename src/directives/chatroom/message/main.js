(function(){
    "use strict";

    angular
    .module("cliApp")
    .directive("cliMessage", cliMessage);

    function cliMessage(){
        return {
            templateUrl: "directives/chatroom/message/main.html",
            restrict: "E",
            scope: {
                config: "="
            },
            controller: function($scope){
                let $ctrl = this;
                $ctrl.config = _.cloneDeep($scope.config);
            },
            controllerAs: "$ctrl"
        };
    }
})();