"use strict";

const https = require("https");
const CountStream = require("./lib/countstream");
const util = require("util");
util.inspect.defaultOptions.depth = null;



const countStream = new CountStream("DEAL");

https.get("https://www.manning.com", res => {
  res.pipe(countStream);
});

countStream.on("total", count => {
  console.log(`total matches: ${ count }`);
});
