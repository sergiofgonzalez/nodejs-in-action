"use strict";

/* Creating a Promise */
var promise = new Promise(function logic(fulfill, reject) {
  if (Math.random() < 0.5) {
    fulfill("Good!");
  } else {
    reject(new Error("Unexpected random result"));
  }
});

/*
 *  Adding callbacks to handle Promises continuation
 *  syntax a) .then(onFullfilled, onRejected)
 */
promise
  .then(function onFullfilled(result) {
    console.log("Promise successfully fulfilled: result=", result);
  }, function onRejected(err) {
    console.log("Promise was rejected: err=", err);
  });

// Using arrow functions is more succinct
promise
  .then(result => console.log(`Promise fulfilled: result=${ result }`),
    err => console.log(`Promise rejected: err=${ err }`));


  /*
   *  syntax b) .then(onFullfilled)
   *            .catch(onRejected)
   */
promise
  .then(function onFullfilled(result) {
    console.log("Promise successfully fulfilled: result=", result);
  })
  .catch(function onRejected(err) {
    console.log("Promise was rejected: err=", err);
  });

// Using arrow functions is (again) more succinct
promise
  .then(result => console.log(`Promise fulfilled: result=${ result }`))
  .catch(err => console.log(`Promise rejected: err=${ err }`));


/* using Promise.resolve and Promise.reject */

// Promise.resolve and Promise.reject return a promise 
// that will immediately settle with a fulfillment value and reject reason
Promise
  .resolve({result: "OK"})
  .then(data => console.log(data.result));

Promise
  .reject(new Error("unfulfilled promise"))
  .then(data => console.log(`This will NEVER be executed: ${ data }`))
  .catch(err => console.log(err));

/* reactions and promise tree-like structure */

// When a promise is fulfilled, reactions registered with p.then are executed
// When a promise is rejected, reactions registered with p.catch are executed
// Note that p.then and p.catch return a new promise each time
// thus, a tree-like structure is created
//                 p
//                 |
//      (then) |---+---| (catch)
//             p1
//  (then) |---+---| (catch)
//         p2

const p = Promise
  .resolve(2);

const p1 = p.then(x => x * 7);
p1.then(result => console.log(result));

// A reaction may return a promise, in which case, the reaction after the second promise
// is fulfilled won't be executed until the previous one is settled

Promise
  .resolve(5)  // immediately-resolved
  .then(x => new Promise(resolve => {
    setTimeout(() => resolve(x * 2), 2000);
  }))
  .then(x => console.log(x));

// A reaction may throw an error, causing the promise returned by .then to be rejected

Promise
  .resolve(5)  // immediately-resolved
  .then(x => new Promise(resolve => {
    setTimeout(() => resolve(new Error(`The value ${ x } wouldn't be accepted`)), 5000); // rejected after 5 secs
  }))
  .then(x => console.log(x))
  .catch(err => console.log(`oops! an error was found ${ err }`));
