/* eslint-disable no-unused-vars */



function runTask (task) {
  return new Promise((resolve, reject) => {
    return task() // task will return a promise
      .then(resolve, reject); // once settled, the original promise will also be settled with the result of task
  });
}

function runTaskDeconstructed(task) {
  return new Promise((resolve, reject) => {
    return task() // task will return a promise
      .then(result => {
        console.log(`fulfilling top-level promise with ${ result }`);
        resolve(result);
      }, err => {
        console.log(`rejecting top-level promise with ${ err.message }`);
        reject(err);
      });
  });
}

function runTaskWithoutChaining(task) {
  return new Promise((resolve, reject) => {
    return task(); // task will return a promise, but original one will not be settled
  });
}

function asyncNum(num) {
  return new Promise((resolve, reject) => {
    if (num % 2 === 0) {
      setTimeout(() => resolve(num), 2000);
    } else {
      setTimeout(() => reject(new Error('the number was odd')), 2000);
    }
  });
}

/* Scenario 1: correct implementation */
// runTask() creates a promise from scratch that delegates their
// resolve and reject callbacks
// runTask(() => asyncNum(5))
//   .then((result) => {
//     console.log(`Fulfilled with result: ${ result }`);
//   })
//   .catch(err => {
//     console.error(`Rejected with reason: ${ err.message }`);
//   });

/* Scenario 2: buggy implementation as runTaskWithoutChaining() will never be settled */
// runTaskWithoutChaining(() => asyncNum(4))
//   .then((result) => {
//     // won't be executed
//     console.log(`Fulfilled with result: ${ result }`);
//   })
//   .catch(err => {
//     // won't be executed
//     console.error(`Rejected with reason: ${ err.message }`);
//   });


/* Scenario 3: correct implementation with enhanced logging */
// scenario that ends in fulfillment
// runTaskDeconstructed(() => asyncNum(4))
//   .then((result) => {
//     console.log(`Fulfilled with result: ${ result }`);
//   })
//   .catch(err => {
//     console.error(`Rejected with reason: ${ err.message }`);
//   });

// scenario that ends in rejection
// runTaskDeconstructed(() => asyncNum(5))
//   .then((result) => {
//     console.log(`Fulfilled with result: ${ result }`);
//   })
//   .catch(err => {
//     console.error(`Rejected with reason: ${ err.message }`);
//   });

/* Scenario 4: functional syntax */
[1, 2, 3].forEach(console.log);