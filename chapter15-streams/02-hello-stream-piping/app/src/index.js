"use strict";

const http = require("http");
const fs = require("fs");
const zlib = require("zlib");

const pathToReallyLargeFile = process.env.LARGE_FILE_PATH;

http.createServer((req, res) => {
  if (req.url === "/") {
    console.log("Non gzipped streaming");
    res.writeHead(200);
    fs.createReadStream(pathToReallyLargeFile).pipe(res);
  } else if (req.url === "/gzip") {
    console.log("Gzipped streaming");
    res.writeHead(200, { "content-encoding": "gzip" });
    fs.createReadStream(pathToReallyLargeFile)
      .pipe(zlib.createGzip())
      .pipe(res);
  }
})
  .listen(5000);

setInterval(() => console.log(process.memoryUsage()), 2500);