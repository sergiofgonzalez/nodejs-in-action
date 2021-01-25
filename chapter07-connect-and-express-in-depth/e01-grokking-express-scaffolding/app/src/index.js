"use strict";

const express = require("express");
const path = require("path");
const favicon = require("serve-favicon");
const logger = require("morgan");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const config = require("./lib/config");

const index = require("./routes/index");
const info = require("./routes/info");
const form = require("./routes/form");
const fakeError = require("./routes/fake-error");

const app = express();

/*
  View engine setup
*/
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

/*
  Middleware setup
*/
app.use(favicon(path.join(__dirname, config("server:public"), "favicon.ico")));
app.use(logger(config("logger:format") || "tiny"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, config("server:public"))));



/*
  Routes setup
*/
app.use("/", index);
app.use("/info", info);
app.use("/form", form);
app.use("/fake-error", fakeError);

/* 
  Error Handling setup
*/
app.use((req, res, next) => {
  const err = new Error("Not Found");
  err.status = 404;
  next(err);
});

app.use((err, req, res, next) => { 
  res.locals.message = err.message;
  if (req.app.get("env") === "development") {   
    res.locals.error = err;
    res.locals.error.method = req.method;
    res.locals.error.url = req.url;
    res.locals.error.timestamp = new Date().toISOString();
  } else {
    res.locals.error = {};
  }
  
  res.locals.info = req.app.get("env") === "development" ? err : {};

  res.status(err.status || 500);
  if (req.headers.accept.indexOf("text/html") !== -1) {
    res.render("error.ejs");
  } else {
    res.send(res.locals.error);
  }
  next(err);
});

module.exports = app;