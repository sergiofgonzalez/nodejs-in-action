'use strict';

const child_process = require('child_process');
const path = require('path');



/* fork: Node process, evented, without subshell */



function doWork(job) {
  return new Promise((resolve, reject) => {
    const child = child_process.fork(path.join(__dirname, `worker`));
    let promiseDone = false;
  
    child
      .once(`error`, err => {
        console.log(`PARENT: error reported from child process: ${ err }`);
        if (!promiseDone) {
          promiseDone = true;
          reject(err);
        }
        child.kill();
      })
      .once(`exit`, (code, signal) => {
        if (!promiseDone) {
          promiseDone = true;
          reject(new Error(`Child exited with code: ${ code }; signal=${ signal }`));
        }
      })
      .once(`message`, result => {
        promiseDone = true;
        resolve(result);
      })
      .send(job);
  });
}

// fire and forget mode
// for (let i = 0; i < 5; i++) {
//   doWork(i);
// }

// Concurrent execution
(async () => {
  const workerPromises = [];
  for (let i = 0; i < 5; i++) {
    const workerPromise = doWork(i);
    workerPromises.push(workerPromise);
  }

  console.log(`PARENT: waiting for results...`);
  const results = await Promise.all(workerPromises);
  console.log(`PARENT: waiting done!`);
  for (const result of results) {
    console.log(`result: ${ result }`);
  }
})();




