"use strict";

const Greeter = require("./lib/greeter"); // eslint-disable-line no-unused-vars
const fs = require("fs");
const path = require("path");
const { promisify } = require("util");
const readFileAsync = promisify(fs.readFile);


console.log(`__dirname="${ __dirname }`);
console.log(`__filename=${ __filename }`);

(async () => {
  try {
    const data = await readFileAsync(path.join(__dirname, "./data/input.csv"));
    console.log(`data=${ data }`);
  } catch (err) {
    console.error(`Error found while attempting to read the file: ${ err.message }`);
  }
})();

(async () => {
  try {
    const data = await readFileAsync("./app/src/data/input.csv");
    console.log(`data=${ data }`);
  } catch (err) {
    console.error(`Error found while attempting to read the file: ${ err.message }`);
  }
})();