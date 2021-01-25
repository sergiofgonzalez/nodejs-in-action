"use strict";

/*
  General requires
*/
const debug = require("debug")(`server:index`);
const express = require("express");
const path = require("path");
const favicon = require("serve-favicon");
const logger = require("morgan");
const bodyParser = require("body-parser");
const session = require("express-session");
const cookieParser = require("cookie-parser");
const config = require("./lib/config");
const messages = require("./middleware/messages");

/*
  Routes
*/
const routes = require("./routes/index");


const app = express();

/*
  View engine setup
*/
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");


/*
  Middleware setup
*/

/* 3rd party middleware */
app.use(favicon(path.join(__dirname, config("server:public"), "favicon.ico")));
app.use(logger(config("logger:format") || "tiny"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(session({ secret: "a237b783c4", resave: false, saveUninitialized: true }));
app.use(express.static(path.join(__dirname, config("server:public"))));

/* custom middleware */
app.use(messages);


/*
  Routes setup
*/


// Interactive Requests
app.get("/", routes.form);
app.post("/", routes.submit);




/* 
  Error Handling setup
*/
app.use(routes.notFound);
app.use(routes.error);


/*
  Displaying some Express related settings
*/
debug(`Application running with env = ${ app.get("env") }`);
debug(`Application running with NODE_ENV = ${ config("NODE_ENV") }`);
debug(`View Caching = ${ app.get("view cache") }`);

module.exports = app;