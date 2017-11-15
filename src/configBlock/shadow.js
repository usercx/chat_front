/**
 * 这个配置是处理遮罩的
 * @author canxin
 */
(function () {
  "use strict";

  angular
    .module("cliApp")
    .factory('shadow', shadow);

  function shadow($rootScope) {
    $rootScope.shadowCounter = 0;
    let other = ['/chat/getMessage']; // 在这个数组里面的元素不执行添加遮罩的操作
    return {
      request: function (config) {
        let url = config.url,
          flag = true;
        for (let i = 0; i < other.length; i++) {
          if (url.indexOf(other[i]) !== -1) {
            flag = false;
            break;
          }
        }
        if (flag) {
          $rootScope.shadowCounter++;
        }
        return config;
      },
      response: function (res) {
        let url = res.config.url,
          flag = true;
        for (let i = 0; i < other.length; i++) {
          if (url.indexOf(other[i]) !== -1) {
            flag = false;
            break;
          }
        }
        if (flag) {
          $rootScope.shadowCounter--;
        }
        return res;
      },
      responseError: function (res) {
        let url = res.config.url,
          flag = true;
        for (let i = 0; i < other.length; i++) {
          if (url.indexOf(other[i]) !== -1) {
            flag = false;
            break;
          }
        }
        if (flag) {
          $rootScope.shadowCounter--;
        }
        return res;
      }
    };
  }
  // function configBlock($httpProvider) {
  //   // 执行顺序为request的时候从0往后执行，response从后往0执行。
  //   $httpProvider.interceptors[1] = shadow;
  //   // .push(shadow);
  // }
})();