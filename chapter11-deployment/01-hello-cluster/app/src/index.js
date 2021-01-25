"use strict";

const cluster = require("cluster");
const http = require("http");

const numCPUs = require("os").cpus().length;
if (cluster.isMaster) {
  console.log(`Master: ${ process.pid }; # of cpu(s): ${ numCPUs }`);
} else {
  console.log(`Worker: ${ process.pid }`);
}


if (cluster.isMaster) {
  for (let i = 0; i < numCPUs; i++) {
    cluster.fork();
  }

  cluster.on("exit", (worker, code, signal) => console.log(`Worker ${ worker.process.pid } died: code=${ code }; signal=${ signal }`));
} else {
  http.createServer((req, res) => {
    res.writeHead(200);
    res.end(`I am a worker running in process: ${ process.pid }`);
  }).listen(5000);
}