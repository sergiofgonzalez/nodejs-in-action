"use strict";

const util = require("util");
util.inspect.defaultOptions.depth = null;

/*
  Passing arguments to the generator function
*/
function* echo(name) {
  yield name;
}

let g = echo("Jane"); // passing an argument to the generator function
console.log(g.next().value);


/*
  Passing arguments to the generator (not the generator function)

  Calling the next() method with an argument will resume the generator function execution,
  replacing the yield statement where execution was paused with the argument passed to next
*/
console.log("========================");
function* printThreeMessages() {
  console.log(yield);
  console.log(yield);
  console.log(yield);
}

g = printThreeMessages(); // no args passed to the function
g.next("zero"); // this can be considered the bootrapping call
g.next("one");  // this will resume the execution from the last call, replacing the yield statement with the value passed: one
g.next("two");  // this will resume the execution from the last call, replacing the yield statement with the value passed: two
g.next("three"); // this will resume the execution from the last call, replacing the yield statement with the value passed: three
g.next("four"); // this won't be displayed, as the generator has completed
g.next("five"); // this won't be displayed, as the generator has completed (idempotent)