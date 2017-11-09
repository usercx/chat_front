(function () {
  "use strict";

  angular
      .module("cliApp")
      .factory("weatherRequest", weatherRequest);

  function weatherRequest($http) {
      let s = {};
      s.select = {};
      s.info = {};
      s.select.getProvince = function(callback){
          $http.get("/weather/getProvinceList")
              .then(callback);
      };
      return s;
  }
})();