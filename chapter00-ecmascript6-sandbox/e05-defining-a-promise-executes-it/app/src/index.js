"use strict";


/* Test 1 */
// /* const p1 = */ new Promise(resolve => {
//   console.log("Inside the promise logic for p1");
//   resolve("OK");
// });

// /* const p2 = */ new Promise(resolve => {
//   console.log("Inside the promise logic for p2");
//   resolve("OK");
// });

// // p2.then(() => p1);  // I would expect p2 to be executed before p1


/* Test 2 */
// const p1 = Promise.resolve(console.log(`hello p1`));
// const p2 = Promise.resolve(console.log(`hello p2`));
// p2.then(() => p1);

/* Test 3 */

function firstStep() {
  return Promise.resolve(console.log("First step"));
}

function secondStep() {
  return Promise.resolve(console.log("Second step"));
}

secondStep().then(() => firstStep());