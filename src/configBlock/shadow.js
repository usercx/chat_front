/**
 * 这个配置是处理遮罩的
 * @author canxin
 */
(function () {
  "use strict";

  angular
    .module("cliApp")
    .config(configBlock);

  function shadow($rootScope){
    $rootScope.shadowCounter = 0;
    return {
      request: function(config){
        $rootScope.shadowCounter++;
        return config;
      },
      response: function(res){
        $rootScope.shadowCounter--;
        return res;
      },
      responseError: function(res){
        $rootScope.shadowCounter--;
        return res;
      }
    };
  }
  function configBlock($httpProvider) {
    $httpProvider
      .interceptors
      .push(shadow);
  }
})();