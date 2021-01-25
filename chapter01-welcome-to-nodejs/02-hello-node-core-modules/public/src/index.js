"use strict";

const fs = require("fs");
const zlib = require("zlib");
const gzip = zlib.createGzip();
const outStream = fs.createWriteStream(`${__dirname}/index.js.gz`);

/* read file, pipe it through gzip compressor, then write to output stream */
fs.createReadStream(`${__dirname}/index.js`)
  .pipe(gzip)
  .pipe(outStream);
