"use strict";

const http = require("http");
const fs = require("fs");

const pathToReallyLargeFile = process.env.LARGE_FILE_PATH;

http.createServer((req, res) => {
  if (req.url === "/") {
    console.log("Non streaming huge file to client");
    fs.readFile(pathToReallyLargeFile, (err, data) => {
      if (err) {
        res.statusCode = 500;
        res.end(err.message);
      } else {
        res.end(data);
      }
    });
  } else if (req.url === "/stream") {
    console.log("Streming huge file to client");
    fs.createReadStream(pathToReallyLargeFile).pipe(res);
  }

})
  .listen(5000);

setInterval(() => console.log(process.memoryUsage()), 2500);