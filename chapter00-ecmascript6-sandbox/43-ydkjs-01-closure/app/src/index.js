'use strict';

/* simple example: closing over msg */
function greeting(msg) {
  return function who(name) {
    console.log(`${ msg }, ${ name }!`);
  };
}

const hello = greeting('Hello'); // creating an instance of the closure
const howdy = greeting('Howdy'); // creating a different instance

hello('Stan');
howdy('neighbour');

/* closures don't make copies of the variables they close over, they keep references to them */
function counter(step = 1) {
  let count = 0;
  return function increaseCount() {
    count += step; // increaseCount closes over `count` and `step` so that they can be read and modified
    return count;
  };
}

const incByOne = counter(1);
const incByThree = counter(3);

console.log(`incByOne(): ${ incByOne() }`);
console.log(`incByOne(): ${ incByOne() }`);
console.log(`incByOne(): ${ incByOne() }`);

console.log(`incByThree(): ${ incByThree() }`);
console.log(`incByThree(): ${ incByThree() }`);
console.log(`incByThree(): ${ incByThree() }`);

/* Closures in async code with callbacks */
function doSomethingAfterSomeTime(msg) {
  // the callback closes over `msg`
  setTimeout(() => {
    console.log(`Howdy, I was told to display this message after 2 seconds: ${ msg }`);
  }, 2000);
}
doSomethingAfterSomeTime('afterthought!');
console.log(`doSomethingAfterSomeTime() is long gone!`);

/* Closure whose outer scope is not defined by a function */
const done = false;
if (!done) {
  let msg = `Hello to Jason Isaacs`;
  // the callback closes over `msg`
  setTimeout(() => {
    console.log(msg);
  }, 4000);
}
console.log(`msg is long gone...`);