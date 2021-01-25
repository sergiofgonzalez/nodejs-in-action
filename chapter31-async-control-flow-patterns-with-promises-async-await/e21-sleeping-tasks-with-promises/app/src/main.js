/* eslint-disable no-unused-vars */
import EventEmitter from 'events';

function asyncNum(num, delay) {
  return new Promise((resolve, reject) => {
    setTimeout(() => resolve(num), 2000);
  });
}


/* Scenario 1: put a single promise to sleep */
// const emitter = new EventEmitter();
// const p = new Promise((resolve, reject) => {
//   asyncNum(4)
//     .then(result => {
//       console.log(`underlying promise fulfilled, but current one put to sleep`);
//       console.log(`seconds: ${ new Date().getSeconds() }`);
//       emitter.on('wakie', () => resolve(result));
//     });
// });

// p.then(result => {
//   console.log(`Done: ${ result } on seconds=${ new Date().getSeconds() }`);
// });

// setTimeout(() => {
//   emitter.emit('wakie');
// }, 5 * 1000);

/* Scenario 2: recreating the consumers situation, without classes */
// const tasks = [];
// const workers = [];
// async function spawnWorker() {
//   // eslint-disable-next-line no-constant-condition
//   while (true) {
//     const task = await getNextTask(); // this will pause until a task is available
//     await task();
//   }
// }

// function getNextTask() {
//   return new Promise(resolve => {
//     if (tasks.length !== 0) {
//       return resolve(tasks.shift());
//     }
//     workers.push(resolve); // getNextTask will be settled when a worker gets a tasks, executes ans settles
//   });
// }

// function runTask(task) {
//   return new Promise((resolve, reject) => {
//     const taskWrapper = () => {
//       const taskPromise = task();
//       taskPromise.then(resolve, reject);
//       return taskPromise;
//     };

//     if (workers.length !== 0) {
//       const worker = workers.shift();
//       worker(taskWrapper); // i don't get this
//     } else {
//       tasks.push(taskWrapper);
//     }
//   });
// }

// for (let i = 0; i < 10; i++) {
//   spawnWorker();
// }

// runTask(() => asyncNum(4))
//   .then((result) => {
//     console.log(`runTask completed with result=${ result }`);
//   });


/* Scenario 3: same scenario, but promise callbacks deconstructed to see flow */
const tasks = [];
const workers = [];
async function spawnWorker() {
  // eslint-disable-next-line no-constant-condition
  while (true) {
    const task = await getNextTask(); // this will pause until a task is available
    await task();
  }
}

function getNextTask() {
  return new Promise(resolve => {
    if (tasks.length !== 0) {
      return resolve(tasks.shift());
    }

    // if no tasks available, put the worker to sleep by pushing the promise resolve callback
    // until a worker gets that callback and settles it that worker will be sleeping
    workers.push((result) => {
      console.log(`Hi, I'm resolve() from getNextTask()!`);
      resolve(result);
    });
  });
}

function runTask(task) {
  return new Promise((resolve, reject) => {
    const taskWrapper = () => {
      const taskPromise = task();
      taskPromise.then(result => {
        console.log(`about to fulfill promise in taskWrapper: ${ result }`);
        resolve(result);
      }, err => {
        console.log(`about to reject promise in taskWrapper: ${ err.message }`);
        reject(err);
      });
      return taskPromise;
    };

    if (workers.length !== 0) {
      const worker = workers.shift();
      // remember that worker will receive the `resolve()` callback from
      // getNextTask(), so the next line just makes that `resolve()` callback
      // to be settled with the result of taskWrapper.
      worker(taskWrapper);
    } else {
      tasks.push(taskWrapper);
    }
  });
}

spawnWorker();


runTask(() => asyncNum(4))
  .then((result) => {
    console.log(`runTask completed with result=${ result }`);
  });