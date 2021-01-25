"use strict";

const connect = require("connect");
const connectLogger = require("./lib/connect-logger-middleware");


function greeting(req, res) {
  res.setHeader("Content-Type", "text/plain");
  res.end("Hello to Jason Isaacs!");
}

connect()
  .use(connectLogger(`:method :url`))
  .use(greeting)
  .listen(5000);