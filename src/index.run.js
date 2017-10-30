(function () {
    "use strict";

    angular
        .module("cliApp")
        .run(runBlock);

    function runBlock() {
        console.log("jenkins log");
        // here is your run Block may contain your watch modules such as $rootScope.$on(); 
    }
})();
