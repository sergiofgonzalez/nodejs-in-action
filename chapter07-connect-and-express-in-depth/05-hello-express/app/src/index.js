"use strict";

const util = require("util");
util.inspect.defaultOptions.depth = null;

const express = require("express");
const app = express();

app.get("/", (req, res) => {
  res.send("Hello to Jason Isaacs!!");
});

console.log("Express HTTP server listening on port 5000");
app.listen(5000);
