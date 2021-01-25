"use strict";

var promise = new Promise(function (resolve, reject) {
  setTimeout(function () {
    if (Math.random() > 0.5) {
      resolve("random success");
    } else {
      reject(new Error("random failure"));
    }
  }, 2500);
});


/* 
  This is similar to simple chaining.
  The second success handler will get the result from the first one:
    + it is strictly waterfall
*/
promise
  .then(data => { console.log(`Success: ${data}`); return data; })
  .then(data2 => console.log(`Another success handler: ${data2}`))
  .catch(err => console.log(`An error has been caught: ${err}`));


/* A more convoluted example in which the first handler return a promise */
Promise
  .resolve("Resolved")
  .then(res => new Promise(function (resolve) {
    setTimeout(() => resolve(`Resolved2 after ${res}`), 1500);
  }))
  .then(res => console.log(`final result after chaining: ${res}`));

/* 
   A promise will be rejected when the resolver calls explicitly reject or when
   it throws an exception
*/

new Promise((resolve, reject) => { throw new Error("oops!");}) // eslint-disable-line no-unused-vars
  .catch(err => console.log(`exception caught: promise has been rejected: ${err}`));

/* this is the same as */

new Promise((resolve, reject) => reject("Ooops!")) // eslint-disable-line no-unused-vars
  .catch(err => console.log(`exception caught: promise has been rejected: ${err}`));


/*
  This thing about tree-like structure is confusing...
*/

Promise
  .resolve("Resolved!")
  .then(data => { throw new Error(`failed`); }) // eslint-disable-line no-unused-vars
  .catch(err => console.error(`Error from previous then is caught: ${ err }`));


Promise
  .reject("Rejected!")
  .then(data => console.log(data)) 
  .catch(err => console.error(`Error from orig promise is caught: ${ err }`));


// You can decompose previous block in fine grained-promises
const p1 = Promise.resolve("Resolved!");
const p11 = p1.then(data => { throw new Error(`failed`); }); // eslint-disable-line no-unused-vars
const p12 = p1.catch(err => console.error(`Error caught from p1 resolution: ${err}`)); // eslint-disable-line no-unused-vars
const p22 = p11.catch(err => console.error(`Error caught from p11 resolution: ${err}`)); // eslint-disable-line no-unused-vars



Promise
  .reject("Rejected!")
  .then(data => {
    console.log(data);
  }, err => {
    console.log(`Error caught: ${ err }`);
  })
  .catch(err => {
    console.log(`Error caught: ${ err }`);
  });

// Another example
Promise
  .resolve(5)
  .catch(err => {
    console.log(`Zero level catch: ${ err }`);  // this will never be displayed
  })
  .then(res => {throw new Error(`An error occurred for ${ res }`);})
  .catch(err => {
    console.log(`First catch err: ${ err }`);
  })
  .catch(err => {
    console.log(`Second catch err: ${ err }`); // this will never be displayed
  }); 


// This is understandable
const r1 = Promise.resolve("OK");
const r2 = r1.then(res => res.a.prop.that.does.not.exist);
const r3 = r2.catch(err => {
  console.log(`This is expected: ${ err.message }`);
}); // eslint-disable-line no-unused-vars
const r4 = r3.catch(err => { // eslint-disable-line no-unused-vars
  console.error(`You won't see this: ${ err.message }`);
}); 

// This one takes some time to digest
// q1 fails, thus q1.then is never executed
// q12 is q1.catch() and therefore is executed
// q22 is q11.catch() as q1 is never fulfilled, q11 will never be fulfilled => q11.catch() will kick in
//  this happens because when a promise is resolved to another promise, the first one stays in pending
//  state until the second one is resolved, then the result is forwarded to the first one, which becomes
//  settled as well.
const q1 = Promise.reject("Rejected!");
const q11 = q1.then(data => {  // eslint-disable-line no-unused-vars
  console.log(data); 
}); 
const q12 = q1.catch(err => {  // eslint-disable-line no-unused-vars
  console.error(`Error caught from q1 resolution: ${err}`); 
}); 
const q22 = q11.catch(err => {  // eslint-disable-line no-unused-vars
  console.error(`Error caught from q11 resolution: ${err}`);  // i don't understand why this one is displayed
}); 