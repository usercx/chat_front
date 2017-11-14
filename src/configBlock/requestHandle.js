/**
 * 这个配置是处理所有的请求错误的（后台已经做过请求异常处理，所以只会接受到200和404的错误，去除404，直流200）
 * @author canxin
 */
(function () {
  "use strict";

  angular
    .module("cliApp")
    .config(configBlock);

  function requestError(){
    return {
      request: function(config){// 将请求重新打到localhost:4006上面去，这个地方只供测试用
        let url = config.url;
        let index = url.indexOf("?");
        index = index === -1 ? url.length : index;
        url = url.substring(0, index);
        if(url.indexOf(".") < 0) { // 在前端调试的环境下请求的路径有.即代表请求的是文件而不是接口
          config.url = "http://192.168.43.47:4666" + config.url;
        }
        return config;
      },
      response: function(res){
        let data = res.data;
        let type = typeof data;
        if(type !== "object"){
          return res;
        }
        if(data.success === false){
          return null;
        }
        return data.data;
      },
      responseError: function(res){
        return null;
      }
    };
  }
  function configBlock($httpProvider) {
    $httpProvider
      .interceptors
      .push(requestError);
  }
})();