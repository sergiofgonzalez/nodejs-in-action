(function () {
  "use strict";

  /* the Model: contains all the state, data and application logic */
  var model = {
    user: "Sergio"
  };

  /* define todoApp module: deps with modules defining the directives are included */
  var app = angular.module("todoApp", ["todoAppHeaderModule", "todoAppTaskFormModule"]);

  app.run(["$http", function ($http) {
    model.items = [];
    $http
      .get(`http://jsdev:5000/tasks`)
      .then(res => {
        model.items = res.data.map((taskFromBackend) => {
          return {action: taskFromBackend.task, done: taskFromBackend.done};
        });
      });
  }]);

  /* the Controller: takes user input and figures out what it means in the model */
  app.controller("ToDoCtrl", function ($http) {
    this.todoInfo = model;

    /* return tasks not completed */
    this.getPendingTasks = function () {
      if (!this.todoInfo.items) {
        return [];
      }
      return this.todoInfo.items.filter(item => !item.done);
    };

    /* return a bootstrap class that changes the color of the tag */
    this.getWarningLevelClass = function () {
      var pendingTasksCount = this.getPendingTasks().length;
      if (pendingTasksCount <= 3) {
        return "tag-success";
      } else {
        return "tag-warning";
      }
    };

    /* placeholder for the new task */
    this.actionText = "";

    /* add a new item to the list of tasks */
    this.addNewItem = function (actionText) {
      this.todoInfo.items.push({action: actionText, done: false});
      this.actionText = "";
      $http.post(`http://jsdev:5000/tasks`, {task: { description: actionText, done: false}})
      .catch(err => console.log(`Could not save new task: ${err}`));
    };

    /* update task */
    this.updateTaskStatus = function (task) {
      $http.post(`http://jsdev:5000/tasks`, {task: { description: task.action, done: task.done}})
      .catch(err => console.log(`Could not update task: ${err}`));
    };

    /* control state of showCompleted checkbox */
    this.showCompleted = true;

  });

  /* filterByCheckedStatus AngularJS custom filter */
  app.filter("filterByCheckedStatus", function () {
    return function(items, showCompleted) {
      if (!items) {
        return [];
      }
      return items.filter(item => !item.done || showCompleted);
    };
  });

})();