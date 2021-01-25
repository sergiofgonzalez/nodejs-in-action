#!/usr/bin/env node

"use strict";

const concat = require("mississippi").concat;
const fs = require("fs");
const yargs = require("yargs");


const argv = yargs
  .usage("parse-json [options]")
  .help("h")
  .alias("h", "help")
  .demand("f") 
  .alias("f", "file")
  .nargs("f", 1)
  .describe("f", "JSON file to parse")
  .argv;

const file = argv.f;


function parse(str) {
  const value = JSON.parse(str);
  console.log(JSON.stringify(value));
}

if (file === "-") {
  process.stdin.pipe(concat(parse)); // concatenate all data from stdin, then call parse
} else {
  fs.readFile(file, (err, dataBuffer) => {
    if (err)  {
      throw err;
    }
    else {
      parse(dataBuffer.toString("utf8"));
    }
  });
}
