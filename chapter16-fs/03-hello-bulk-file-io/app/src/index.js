"use strict";

const fs = require("fs");
const path = require("path");
const util = require("util");

const readFileAsync = util.promisify(fs.readFile);


/* using good-old callbacks */
(() => {
  fs.readFile(path.join(__dirname, "data", "file.txt"), (err, buf) => {
    console.log("Buffer length: ", buf.length);
    console.log(`Buffer contents (utf8):\n${ buf.toString("utf8") }`);
  });
})();

/* using promises */
(() => {
  readFileAsync(path.join(__dirname, "data", "file.txt"))
    .then(buf => {
      console.log("Buffer length: ", buf.length);
      console.log(`Buffer contents (utf8):\n${ buf.toString("utf8") }`);      
    });
})();

/* using async/await */
(async () => {
  const buf = await readFileAsync(path.join(__dirname, "data", "file.txt"));
  console.log("Buffer length: ", buf.length);
  console.log(`Buffer contents (utf8):\n${ buf.toString("utf8") }`);
})();

