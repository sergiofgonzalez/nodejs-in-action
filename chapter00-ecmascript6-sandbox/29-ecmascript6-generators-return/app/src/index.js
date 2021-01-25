"use strict";

const util = require("util");
util.inspect.defaultOptions.depth = null;

/*
  Calling g.return() will immediately terminate the generated sequence
*/
function* numbers() {
  yield 1;
  yield 2;
  yield 3;
}

let g = numbers();

console.log(g.next());
console.log(g.return());
console.log(g.next());

/*
  As g.return(value) performs the return at the location of yield where the generator
  function was last suspended, you can prevent terminator of the generated sequence
  by including a finally block in the generator function
*/
console.log("=========================");
function* numbersWithTermination() {
  try {
    yield 1;
    yield 2;
    yield 3;
  } finally {
    yield -1;
    yield -2;
  }
  yield 10;
  yield 11;
}

g = numbersWithTermination();
console.log(g.next());            // -> 1
console.log(g.return(-12345));    // -> -1
console.log(g.next());            // -> -2
console.log(g.next());            // -> -12345
console.log(g.next());            // done!
console.log(g.next());            // done!

/*
  You can also return from a generator function
  Note that the returned value is returned with done=true
  therefore, it won't be picked up by the spread operator or Array.from
*/
console.log("=========================");
function* numbersExplicitReturn() {
  yield 1;
  yield 2;
  return 3;
  yield 4;    // eslint-disable-line no-unreachable
}

g = numbersExplicitReturn();
console.log(g.next());            // -> 1, done: false
console.log(g.next());            // -> 2, done: false
console.log(g.next());            // -> 3, done: true! (a regular yield would've produced 3, done: false)
console.log(g.next());            // done!
console.log(g.next());            // done!

/*
  Because of that behavior, the returned value won't show up
  when using the spread operator or Array.from
*/
console.log("=========================");
console.log([...numbersExplicitReturn()]);
console.log(Array.from(numbersExplicitReturn()));