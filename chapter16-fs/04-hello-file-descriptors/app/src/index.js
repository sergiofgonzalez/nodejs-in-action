"use strict";

const fs = require("fs");
const path = require("path");


(() => {
  const fd = fs.openSync(path.join(__dirname, "data", "file.txt"), "r");
  console.log("fd:", fd);
})();


/* async version using callbacks */
(() => {
  fs.open(path.join(__dirname, "data", "file.txt"), "r", (err, fd) => {
    console.log("fd:", fd);
  });
})();

