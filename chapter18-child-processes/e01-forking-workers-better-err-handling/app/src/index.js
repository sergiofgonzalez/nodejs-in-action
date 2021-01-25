'use strict';

const child_process = require('child_process');
const path = require('path');
const util = require('util');


// const error = new Error(`fabricated err`);
// console.log(error instanceof Error);
// console.log(typeof error);
// console.log(util.inspect(error));

/* fork: Node process, evented, without subshell */



function doWork(job, cb) {
  const child = child_process.fork(path.join(__dirname, `worker`));
  /* Uncomment next line to debug parent/chil */
  // const child = child_process.fork(path.join(__dirname, `worker`), [], {execArgv: ['--inspect=9223']});
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
      console.log(`PARENT: exit received from child process: ${ code }; signal=${ signal }`);
      if (!cbTriggered) {
        cbTriggered = true;
        cb(new Error(`Child exited with code: ${ code }; signal=${ signal }`));
      }
    })
    .once(`message`, result => {
      if (!cbTriggered) {
        console.log(`PARENT: message received: ${ util.inspect(result) }`);
        if (result && typeof result === 'object' && 'err' in result) {
          console.log(`PARENT: it was an error: ${ util.inspect(result) }`);
          cb(result);
          cbTriggered = true;
        } else {
          console.log(`PARENT: it was a result: ${ util.inspect(result) }`);
          cb(null, result);
          cbTriggered = true;
        }
      } else {
        console.log(`PARENT: message received but callback had already been triggered: ${ util.inspect(result) }`);
      }
    })
    .once(`error`, err => {
      console.log(`PARENT: error received from child process: ${ util.inspect(err) }`);
      if (!cbTriggered) {
        cbTriggered = true;
        cb(err);
      }
    })
    .send(job);
}

for (let i = 0; i < 10; i++) {
  doWork(i, (err, result) => {
    if (err) {
      return console.log(`PARENT: An error occurred while doing work(${ i }): ${ util.inspect(err) }`);
    }
    console.log(`PARENT: Successfully completed work(${ i }): ${ util.inspect(result) }`);
  });
}
