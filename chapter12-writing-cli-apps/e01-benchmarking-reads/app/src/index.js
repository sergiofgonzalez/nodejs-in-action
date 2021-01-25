#!/usr/bin/env node
"use strict";

const fs = require("fs");
const yargs = require("yargs");

const args = yargs
  .usage("showfile [options]")
  .help("h").alias("h", "help")
  .demand("r").alias("r", "read")
  .nargs("r", 1)
  .array("r")
  .describe("r", "file to read")
  .example("showfile -r packag.json", "Display the file package.json in the standard output")
  .argv;

function readFile(file) {
  if (file && file.length) {
    console.log(`Reading file ${ file }`);
    console.time(`${ file }`);
    const stream = fs.createReadStream(file);
    stream.on("end", () => console.timeEnd(`${ file }`));
    stream.pipe(process.stdout);
  } else {
    console.error("A file must be provided with the -r option");
    process.exit(1);
  }
}


args.r.forEach(file => readFile(file));



