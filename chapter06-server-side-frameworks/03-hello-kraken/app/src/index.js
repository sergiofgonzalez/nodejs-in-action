"use strict";

const express = require("express");
const kraken = require("kraken-js");

/*
  Create and configure application
*/
const options = {
  onconfig: function(config, next) {
    next(null, config);
  }
};

const app = module.exports = express();
app.use(kraken(options));

app.on("start", () => {
  console.log("Application ready to serve requests");
  console.log(`Environment: ${ app.kraken.get("env:env") }`);
});