'use strict';

/* Try #1: Efficient factorial that over-exposes internal details to the global scope */

// var cache = {};

// function factorial(num) {
//   if (num < 2) return 1;
//   if (!(num in cache)) {
//     cache[num] = num * factorial(num - 1);
//   }
//   return cache[num];
// }

// console.log(`5! = ${ factorial(5) }`);
// console.log(`7! = ${ factorial(7) }`);
// console.log(`10! = ${ factorial(10) }`);
// console.log(cache);

/* Try #2: Limiting over-exposure of internal details creating a "middle-scope" */

// function hideTheCache() {
//   var cache = {};

//   return factorial; // we're returning the function

//   function factorial(num) {
//     if (num < 2) return 1;
//     if (!(num in cache)) {
//       cache[num] = num * factorial(num - 1);
//     }
//     return cache[num];
//   }
// }

// var factorial = hideTheCache();
// console.log(`5! = ${ factorial(5) }`);
// console.log(`7! = ${ factorial(7) }`);
// console.log(`10! = ${ factorial(10) }`);
// // console.log(cache); // cache is no longer exposed

/* Try #3: better dev experience than #2 */
var factorial = (() => {
  var cache = {};

  function factorial(num) {
    if (num < 2) return 1;
    if (!(num in cache)) {
      cache[num] = num * factorial(num - 1);
    }
    return cache[num];
  }

  return factorial;
})();

console.log(`5! = ${ factorial(5) }`);
console.log(`7! = ${ factorial(7) }`);
console.log(`10! = ${ factorial(10) }`);
// console.log(cache); // cache is no longer exposed
