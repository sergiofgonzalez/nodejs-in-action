'use strict';

const child_process = require('child_process');
const path = require('path');
const util = require('util');



/* fork: Node process, evented, without subshell */



function doWork(job, cb) {
  const child = child_process.fork(path.join(__dirname, `worker`));
  let cbTriggered = false;

  child
    .once(`error`, err => {
      console.log(`PARENT: error reported from child process: ${ err }`);
      if (!cbTriggered) {
        cb(err);
        cbTriggered = true;
      }
      child.kill();
    })
    .once(`exit`, (code, signal) => {
      if (!cbTriggered) {
        cbTriggered = true;
        cb(new Error(`Child exited with code: ${ code }; signal=${ signal }`));
      }
    })
    .once(`message`, result => {
      cb(null, result);
      cbTriggered = true;
    })
    .send(job);
}

for (let i = 0; i < 5; i++) {
  doWork(i, (err, result) => {
    if (err) {
      return console.log(`PARENT: An error occurred while doing work(${ i }): ${ util.inspect(err) }`);
    }
    console.log(`PARENT: Successfully completed work(${ i }): ${ result }`);
  });
}


