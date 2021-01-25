'use strict';

const http = require('http');
const path = require('path');
const debug = require('debug')('process-pool:index');
const makePool = require('./lib/pooler');


const doJob = makePool(path.join(__dirname, 'worker'));

let jobId = 0;
http.createServer((req, res) => {
  doJob(jobId++, (err, data) => {
    if (err) {
      return res.end(`received an error: ${ err.message }`);
    }
    res.end(data);
  });
}).listen(5000);

debug(`Listening for tasks on port 5000`);
