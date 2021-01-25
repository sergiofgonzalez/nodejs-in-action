#!/usr/bin/env node
"use strict";

const debug = require("debug")("index");
const https = require("https");
const http = require("http");
const yargs = require("yargs");
const CountStream = require("./lib/countstream");
const util = require("util");
util.inspect.defaultOptions.depth = null;


debug(`Parameters: ${ process.argv }`);

const argv = yargs
  .usage("wordcount <URL|.> [options]")
  .help("h").alias("h", "help")
  .demandCommand(1, "You need at least one URL or '.' if using stdin")  
  .demand("t").alias("t", "text")
  .nargs("t", 1)
  .describe("t", "text to match in the input")
  .example("wordcount http://some.url.com -t DEAL", "Count occurrences of 'DEAL' in the given URL")
  .example("cat file.txt | wordcount . --text DEAL", "Count the occurrences of 'DEAL' in the file.txt")
  .argv;


debug(`Received arguments after parse: ${ util.inspect(argv) }`);

const regex = argv.text;

const countStream = new CountStream(regex);

const source = argv._[0];

if (source.startsWith("https://")) {
  debug(`Using https to access: ${ source }`);
  fetch(https, source);
} else if (source.startsWith("http://")) {
  debug(`Using http to access: ${ source }`);
  fetch(http, source);
} else if (source === ".") {
  debug(`matching from stdin`);
  process.stdin.pipe(countStream);
} else {
  console.error("Invalid command: only a URL or '.' for stdin is allowed");
  yargs.showHelp();
}

countStream.on("total", count => {
  console.log(`total matches: ${ count }`);
});

function fetch(accessFn, url) {
  accessFn.get(url, res => {
    const { statusCode } = res;
    if (statusCode !== 200) {
      console.error(`Request Failed: Status Code: ${ statusCode }`);
      res.resume(); // consume remaining data
      return;
    }
    res.pipe(countStream);
  }).on("error", e => {
    console.error(`Error found: ${ e.message }`);
  });
}
