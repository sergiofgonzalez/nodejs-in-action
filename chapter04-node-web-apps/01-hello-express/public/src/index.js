"use strict";

const config = require("./lib/config");
const log4js = require("log4js");
const logger = log4js.getLogger("index.js");
logger.setLevel(config("logger:level"));


const express = require("express");

const app = express();

app.get("/", (req, res) => {
  res.send("Hello, world!!!");
});

logger.info(`HTTP server started on port ${config("server:port")}`);
app.listen(config("server:port"));