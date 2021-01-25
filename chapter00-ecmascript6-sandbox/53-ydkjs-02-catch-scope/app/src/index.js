'use strict';

try {
  throw new Error('fabricated error');
} catch (err) {
  console.log(err.message);
  // eslint-disable-next-line no-unused-vars
  let onlyHere = true;
  var outerVar = true;
}

console.log(outerVar);  // OK
// console.log(onlyHere);  // oops: only attached to the catch-block scope
// console.log(err);       // oops: only attached to the catch-block scope

try {
  throw new Error('fabricated error2');
} catch { // no longer a scope
  console.log(`recovering from error`);
}

