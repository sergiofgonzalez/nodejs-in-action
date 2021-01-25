"use strict";

const path = require("path");
const config = require("./lib/config");
const log4js = require("log4js");
const express = require("express");
const bodyParser = require("body-parser");
const Task = require("./models/Task").Task;

// Logger configuration
const logger = log4js.getLogger("index.js");
logger.setLevel(config("logger:lever"));



// Express configuration
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));


app.set(`port`, config(`server:port`));

const pathToClientApplication = path.join(__dirname, config("server:static-path"));
logger.debug(`Serving static application found in ${pathToClientApplication}`);

app.use(express.static(pathToClientApplication));

app.get(`/tasks`, (req, res, next) => {
  logger.debug(`Request received to return all tasks`);
  Task.all((err, tasks) => {
    if (err) {
      logger.error(`Error retrieving tasks from the database: ${err}`);
      return next(err);
    }
    res.send(tasks.map(task => {
      return {task: task.task, done: (task.done === 0)? false: true};
    }));
  });
});

app.post(`/tasks`, (req, res, next) => {
  const task = req.body.task;
  logger.debug(`Request received to save a new task`);
  Task.create(task, (err, task) => {
    if (err) {
      logger.error(`Error saving task to the database: ${err}`);
      return next(err);
    }
    res.send(task);
  });
});


app.listen(app.get(`port`), err => {
  if (err) {
    logger.error(`Could not establish HTTP server on port ${app.get("port")}`);
    throw err;
  }
  logger.info(`HTTP server started on port ${app.get("port")}`);
});

module.exports = app;
