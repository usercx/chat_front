(function () {
  "use strict";

  angular
      .module("cliApp")
      .controller("weatherInfoCtrl", weatherInfoCtrl);

  function weatherInfoCtrl($stateParams, $state, weatherRequest) {
    let vm = this,
      cityId = $stateParams.cityId,
      areaId = $stateParams.areaId;
    let reject = function(){
      $state.go("weather.choose");
    };
    // 获取地区的天气信息
    let getWeatherInfo = function(){
      if(vm.place.areaId){// 根据区来获取天气信息
        weatherRequest.info.getWeatherInfoByArea(vm.place.areaId, function(data){
          vm.info = data;
        });
      } else { // 根据市来获取天气信息
        weatherRequest.info.getWeatherInfoByCity(vm.place.cityId, function(data){
          vm.info = data;
        });
      }
    };
    // 初始化，获取地区的所有信息
    function init(){
      return new Promise(function(resolve, reject){
        if(areaId){
          weatherRequest.info.getPlaceInfoByAreaId(areaId, function(data){
            resolve(data);
          });
        } else if(cityId){
          weatherRequest.info.getPlaceInfoByCityId(cityId, function(data){
            resolve(data);
          });
        } else {
          reject("unknown city");
        }
      });
    }
    init()
      .then(function(data){
        if(!data || !data.provinceId || !data.cityId){ // 如果未获取到地区的信息则返回到地区选择页面
          reject();
        }
        vm.place = data;
        getWeatherInfo();
      }, reject);
    
    /**
     * 保留固定小数
     */
    vm.fixed = function(num, fix){
      fix = fix || 2;
      num = parseFloat(num);
      return num !== num ? "" : num.toFixed(fix);
    };
  }
})();