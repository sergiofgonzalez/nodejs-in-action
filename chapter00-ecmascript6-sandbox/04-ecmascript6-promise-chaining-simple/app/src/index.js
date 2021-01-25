"use strict";


/* Case 1: Basic chaining */

// Creating a Promise
var promise = new Promise(function logic(fulfill) {
  fulfill("{\"name\": \"sergio\"}");
});


// Simple chaining retuning values 
promise
  .then(function (value) {
    return JSON.parse(value);
  })
  .then(function (value) {
    console.log(value.name);
  })
  .catch(function (err) {
    console.log("An error has occurred: ", err);
  });

// using arrow functions is more succinct
promise
  .then(value => JSON.parse(value))
  .then(value => console.log(value.name))
  .catch(err => console.log(`An error has occurred: ${ err }`));

/* Case 2: Catching errors with basic chaining */
Promise
  .resolve(5)
  .then(x => {
    throw new Error(`the value ${ x } wouldn't be accepted`);
  })
  .catch(err => console.log(`The promise from prev node was rejected: ${ err }`));

// This will work too
Promise
  .reject(new Error("rejects"))
  .then(x => x * 2)
  .then(x => console.log(x))
  .catch(err => console.log(`The promise from prev node was rejected: ${ err }`));