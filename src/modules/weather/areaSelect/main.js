(function () {
  "use strict";

  angular
      .module("cliApp")
      .controller("weatherChooseCtrl", weatherChooseCtrl);

  function weatherChooseCtrl(weatherRequest) {
    let vm = this;
    vm.select = 0;// 当前选择，为0代表选择省，1代表市，2代表区（市级便可以进入到天气信息页面了）
    vm.change = function(index){
      vm.select = index;
    };
    /**
     * 省级城市li样式返回
     */
    vm.provinceClass = function(){
      return {
        active: vm.select === 0
      };
    };
    /**
     * 市级城市li样式返回
     */
    vm.cityClass = function(){
      return {
        active: vm.select === 1
      };
    };
    /**
     * 区级城市li样式返回
     */
    vm.areaClass = function(){
      return {
        active: vm.select === 2
      };
    };
    vm.province = {};
    vm.city = {};
    vm.area = {};
    weatherRequest.select.getProvince(function(data){
      vm.province.list = data;
    });
  }
})();