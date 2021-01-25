"use strict";

const fileLock = require("./lib/file-lock");

fileLock.lock(err => {
  if (err) {
    console.log(err.message);
    throw err;
  }
});