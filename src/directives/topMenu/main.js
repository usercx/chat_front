(function () {
  "use strict";

  angular
    .module("cliApp")
    .directive("topMenu", topMenu);

  function topMenu() {
    return {
      restrict: "E",
      templateUrl: "directives/topMenu/main.html",
      scope: {
        'marginTop': "="
      },
      controller: function($scope, $timeout){
        $scope.marginTop = "25px";
        $scope.isShow = true;
        $scope.close = function(){
          $scope.marginTop = "0px";
          $scope.isShow = false;
        };
        $scope.refresh = function(){
          window.location.href = "/";
        };
        // 定时器的ID
        let timerId = null;
        // 5秒后关闭
        $scope.time = 6;
        let timeout = function(){
          $scope.time--;
          if($scope.time === 0) {
            $scope.close();
            $timeout.cancel(timerId);
          } else {
            timerId = $timeout(timeout, 1000);
          }
        };
        timeout();
      }
    };
  }
})();