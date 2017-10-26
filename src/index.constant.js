(function () {
    "use strict";

    /**
     * 常量如果很少的话可以全部写在这里，如果很多的话可以写在module中每个具体的模块里面然后在这里只写公用部分的常量
     */
    angular
        .module("cliApp")
        .constant("cliConstant", {
            "hello": "miaomiaomiao"
        });

})();