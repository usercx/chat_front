(function () {
  "use strict";

  angular
      .module("cliApp")
      .controller("weatherCtrl", weatherCtrl);

  function weatherCtrl() {
    document.title = "小久天气";
  }
})();