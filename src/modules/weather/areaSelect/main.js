(function () {
  "use strict";

  angular
      .module("cliApp")
      .controller("weatherChooseCtrl", weatherChooseCtrl);

  function weatherChooseCtrl(weatherRequest, $state) {
    let vm = this;
    vm.select = 0;// 当前选择，为0代表选择省，1代表市，2代表区（市级便可以进入到天气信息页面了）
    vm.province = {};
    vm.city = {};
    vm.area = {};
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
    /**
     * 获取城市列表
     * @param {*Number} provinceId 
     */
    let getCityList = function(provinceId){
      weatherRequest.select.getCity(provinceId, function(data){
        vm.city.list = data;
      });
    };
    /**
     * 获取区列表
     * @param {*Number} cityId 
     */
    let getAreaList = function(cityId){
      weatherRequest.select.getArea(cityId, function(data){
        vm.area.list = data;
      });
    };
    /**
     * 选择省
     */
    vm.selectProvince = function(province){
      getCityList(province.id);
      vm.province.select = province;
      vm.city.select = null;
      vm.area.select = null;
      vm.select = 1;
    };
    /**
     * 选择市
     */
    vm.selectCity = function(city){
      getAreaList(city.id);
      vm.city.select = city;
      vm.area.select = null;
      vm.select = 2;
    };
    /**
     * 选择区
     */
    vm.selectArea = function(area){
      vm.area.select = area;
    };

    /**
     * 去往天气具体详情页面
     */
    vm.go = function(){
      let param = {};
      if(vm.area.select){
        param.areaId = vm.area.select.id;
      } else {
        param.cityId = vm.city.select.id;
      }
      $state.go("weather.info", param);
    };
    /**
     * 初始化所有省份
     */
    weatherRequest.select.getProvince(function(data){
      vm.province.list = data;
    });
  }
})();