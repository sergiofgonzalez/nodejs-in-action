"use strict";

const util = require("util");
util.inspect.defaultOptions.depth = null;

/*
  Regular iterators
*/
const sequence = {
  [Symbol.iterator]() {
    const items = ["H", "e", "l", "l", "o"];
    return {
      next: () => {return {done: items.length === 0, value: items.shift()}; }
    };
  }
};

console.log([...sequence]);
console.log(Array.from(sequence));
for (const item of sequence) {
  console.log(item);
}


/*
  Async iterators
  + next must return a Promise that resolves to an object containing value and done properties
*/

const asyncSequence = {
  [Symbol.asyncIterator]() {
    const items = ["H", "e", "l", "l", "o"];
    return {
      next: () => Promise.resolve({
        done: items.length === 0,
        value: items.shift()
      })
    };
  }
};

async function printAsyncSequence() {
  for await (const item of asyncSequence) {
    console.log(item);
  }
}
printAsyncSequence();