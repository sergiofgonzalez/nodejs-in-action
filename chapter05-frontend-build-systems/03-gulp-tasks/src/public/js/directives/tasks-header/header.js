(function () {
  "use strict";

  const headerModule = angular.module("todoAppHeaderModule", []);

  headerModule.directive("tasksHeader", function () {
    return {
      restrict: "E",
      templateUrl: "js/directives/tasks-header/tasks-header.html"
    };
  });
})();