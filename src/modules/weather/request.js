(function () {
  "use strict";

  angular
    .module("cliApp")
    .factory("weatherRequest", weatherRequest);

  function weatherRequest($http) {
    let s = {};
    s.select = {};
    s.info = {};
    /**
     * 选择城市页面的所有接口，全部放在select下
     */
    s.select.getProvince = function (callback) {
      $http
        .get("/weather/getProvinceList")
        .then(callback);
    };
    s.select.getCity = function (id, callback) {
      $http
        .get("/weather/getCityList?provinceId=" + id)
        .then(callback);
    };
    s.select.getArea = function (id, callback) {
      $http
        .get("/weather/getAreaList?cityId=" + id)
        .then(callback);
    };

    /**
     * 天气信息查询展示接口
     */
    s.info.getPlaceInfoByAreaId = function(areaId, callback){
      $http.get("/weather/getPlaceInfoAllByAreaId?areaId=" + areaId)
        .then(callback);
    };
    s.info.getPlaceInfoByCityId = function(cityId, callback){
      $http.get("/weather/getPlaceInfoAllByCityId?cityId=" + cityId)
        .then(callback);
    };
    s.info.getWeatherInfoByCity = function(id, callback){
      $http.get("/weather/getWeatherInfo?cityId=" + id)
        .then(callback);
    };
    s.info.getWeatherInfoByArea = function(id, callback){
      $http.get("/weather/getWeatherInfo?areaId=" + id)
        .then(callback);
    };
    return s;
  }
})();