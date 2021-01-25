"use strict";

const cluster = require("cluster");
const http = require("http");

const numCPUs = require("os").cpus().length;
const workers = {};
let requests = 0;

/* master codebase */
if (cluster.isMaster) {
  /* spin as many workers as CPUs using cluster.fork */
  for (let i = 0; i < numCPUs; i++) {
    workers[i] = cluster.fork();
    /* establish an event listener for evt "message" on each worker */
    (i => {
      workers[i].on("message", message => {
        if (message.cmd === "incrementRequestTotal") {
          requests++;
          for (let j = 0; j < numCPUs; j++) {
            workers[j].send({
              cmd: "updateOfRequestTotal",
              requests: requests
            });
          }
        }
      });
    })(i);
  }

  cluster.on("exit", (worker, code, signal) => {
    console.log(`Worker ${ worker.process.pid } died; code= ${ code }; signal= ${ signal }`);
  });
} else {
  process.on("message", message => {
    if (message.cmd === "updateOfRequestTotal") {
      requests = message.requests;
    }
  });

  http.createServer((req, res) => {
    res.writeHead(200);
    res.end(`Worker ${ process.pid }: ${ requests } request(s)`);
    process.send({ cmd: "incrementRequestTotal" });
  }).listen(5000);
}