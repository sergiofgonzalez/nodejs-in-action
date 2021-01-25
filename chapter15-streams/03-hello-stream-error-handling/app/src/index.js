"use strict";

const fs = require("fs");

const stream = fs.createReadStream("this-file-does-not-exist");

stream.on("error", err => {
  console.error("An error was found while using the stream:", err.message);
});
