(function () {
    "use strict";

    angular
        .module("cliApp")
        .factory("chatRequest", chatRequest);

    function chatRequest($http) {
        let s = {};
        s.chat = function(config){
            $http.get("/chat/getMessage?message=" + config.message)
                .then(config.successCb, config.errorCb);
        };
        return s;
    }
})();