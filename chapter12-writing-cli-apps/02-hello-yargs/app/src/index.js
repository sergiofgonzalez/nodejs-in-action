"use strict";

const fs = require("fs");
const yargs = require("yargs");

/* how process.argv differs from yargs.argv */
console.log(yargs.argv);

/* how to validate arguments */
const argv = yargs
  .demand("f")    // require -f
  .nargs("f", 1)  // -f needs one arg after it
  .describe("f", "JSON file to parse")
  .argv;

const file = argv.f;

fs.readFile(file, (err, dataBuffer) => {
  const strValue = JSON.parse(dataBuffer.toString("utf8"));
  console.log(JSON.stringify(strValue));
});