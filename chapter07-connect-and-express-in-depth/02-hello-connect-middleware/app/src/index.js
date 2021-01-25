"use strict";

const connect = require("connect");

function logger(req, res, next) {
  console.log(`${ req.method } ${req.url }`);
  next();
}

function greeting(req, res) {
  res.setHeader("Content-Type", "text/plain");
  res.end("Hello to Jason Isaacs!");
}

connect()
  .use(logger)
  .use(greeting)
  .listen(5000);