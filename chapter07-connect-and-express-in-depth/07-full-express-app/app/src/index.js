"use strict";

/*
  General requires
*/
const debug = require("debug")(`index:server`);
const express = require("express");
const path = require("path");
const favicon = require("serve-favicon");
const logger = require("morgan");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const session = require("express-session");
const config = require("./lib/config");

/*
  Middleware
*/
const user = require("./middleware/user");
const validate = require("./middleware/validate");
const messages = require("./middleware/messages");
const page = require("./middleware/page");

/*
  Routes
*/
const routes = require("./routes/index");
const entries = require("./routes/entries");
const users = require("./routes/users");
const register = require("./routes/register");
const login = require("./routes/login");
const api = require("./routes/api");

/*
  Models
*/
const Entry = require("./models/entry");



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
app.use(session({ secret: "secret", resave: false, saveUninitialized: true }));
app.use(express.static(path.join(__dirname, config("server:public"))));

/* custom middleware */
app.use(messages);
app.use("/api", api.auth);
app.use(user);


/*
  App settings related config
*/
app.set("entriesPerPage", config("app:entriesPerPage"));



/*
  Routes setup
*/

// RESTful API
app.get("/api/user/:id", api.user);
app.post("/api/entry", api.validateUserCredentials, entries.submit);
app.get("/api/entries/:page?", page(Entry.count), api.entries); // we use the default value for paging programmatically

// Interactive Requests
app.get("/post", entries.form);
app.post("/post", validate.required("entry[title]"), validate.lengthAbove("entry[title]", 4), entries.submit);

app.use("/users", users);

app.get("/register", register.form);
app.post("/register", validate.required("user[name]"), validate.required("user[pass]"), register.submit);

app.get("/login", login.form);
app.post("/login", login.submit);
app.get("/logout", login.logout);



/* This will validate the page parameter */
app.param("page", async (req, res, next, id) => {
  async function getNumAvailPages() {
    return new Promise((resolve, reject) => {
      Entry.count((err, numEntries) => {
        if (err) {
          return reject(err);
        }
        return resolve(Math.ceil(numEntries / app.get("entriesPerPage")));
      });
    });
  }

  const pageNumCandidate = Number.parseInt(id);
  const numAvailPages = await getNumAvailPages();

  if (!Number.isNaN(pageNumCandidate) && pageNumCandidate >= 0 && pageNumCandidate < numAvailPages) {
    next();
  } else {
    routes.notFound(req, res, next);
  }
});


/* This will handle `/` requests */
app.get("/:page?", page(Entry.count, app.get("entriesPerPage")), entries.list);

/* This enables a fake error route so that you can check how it looks */
if (config("ERROR_ROUTE")) {
  app.get("/dev/error", (req, res, next) => {
    const err = new Error("database connection failed");
    err.type = "database";
    next(err);
  });
}

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

debug(`ERROR_ROUTE = ${ config("ERROR_ROUTE") }`);
debug(`Entries per page = ${ app.get("entriesPerPage") }`);


module.exports = app;

