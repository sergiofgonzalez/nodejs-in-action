'use strict';

const child_process = require('child_process');
const util = require('util');
const debug = require('debug')('process-pool:pooler');
const cpus = require('os').cpus().length;



module.exports = workModule => {

  const awaiting = [];
  const readyPool = [];
  let poolSize = 0;

  return function doWork(job, cb) {
    if (!readyPool.length && poolSize > cpus) {
      debug(`job ${ job } has been queued because all processes in the pool are busy: poolSize=${ poolSize }; cpus=${ cpus }`);
      return awaiting.push([doWork, job, cb]);
    }

    debug(`Preparing execution for job ${ job }`);
    const child = readyPool.length ? readyPool.shift() : (poolSize++, child_process.fork(workModule));
    let cbTriggered = false;

    child
      .removeAllListeners()
      .once('error', err => {
        debug(`job ${ job } signaled an error. Child process will be killed.`);
        if (!cbTriggered) {
          cb(err);
          cbTriggered = true;
        }
        child.kill();
      })
      .once('exit', (code, signal) => {
        debug(`job ${ job } exited`);
        if (!cbTriggered) {
          cb(new Error(`Child exited with code=${ code }; signal=${ signal }`));          
        }
        poolSize--;
        const childIndex = readyPool.indexOf(child);
        if (childIndex > -1) {
          readyPool.splice(childIndex, 1);
        }
      })
      .once('message', message => {
        debug(`job ${ job } ended: ${ util.inspect(message) }`);
        cb(null, message);
        cbTriggered = true;
        readyPool.push(child);
        if (awaiting.length) {
          debug(`Executing next task on the queue: queue length=${ awaiting.length }`);
          setImmediate.apply(null, awaiting.shift);
        }
      })
      .send(job);
  };
};
