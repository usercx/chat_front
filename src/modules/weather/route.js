(function () {
  "use strict";

  angular
      .module("cliApp")
      .config(routeConfig);

  function routeConfig($stateProvider) {
      $stateProvider
          .state("weather", {
              "url": "/weather",
              // templateUrl: "modules/weather/main.html",
              template: "<div ui-view></div>",
              controller: "weatherCtrl",
              controllerAs: "vm",
              abstract: true
              // controller: "weatherCtrl",
              // controllerAs: "vm"
          })
          .state("weather.choose", {
            url: '/choose',
            templateUrl: "modules/weather/areaSelect/main.html",
            controller: "weatherChooseCtrl",
            controllerAs: "vm"
          })
          .state("weather.info", {
            url: '/info?provinceId=&cityId=&areaId',
            // params: {
            //   province: null,
            //   city: null,
            //   area: null
            // },
            templateUrl: "modules/weather/weatherInfo/main.html",
            controller: "weatherInfoCtrl",
            controllerAs: "vm"
          });
  }
})();