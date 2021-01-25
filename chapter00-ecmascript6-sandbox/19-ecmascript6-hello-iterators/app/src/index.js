"use strict";

const util = require("util");
util.inspect.defaultOptions.depth = null;

/* 
  A JavaScript object can be turned into an iterable sequence by
  assigning a function to the Symbol.iterator property.
  This function must adhere to the following protocol:
    + iterators must be object with a next method.
    + The next method takes no args and return an object with 2 properties:
      + value: the current item in the sequence
      + done : a boolean indicating whether the sequence has ended
*/
const sequence = {
  [Symbol.iterator]() {
    const items = ["h", "e", "l", "l", "o", " ", "i", "t", "e", "r", "a", "t", "o", "r"];
    return {
      next: () => ({
        done: items.length === 0,
        value: items.shift()
      })
    };
  }
};

// You can iterate over an iterable object with for..of
for (let item of sequence) {
  console.log(item);
}

// using the spread operator
console.log([...sequence]);

// using Array.from
console.log(Array.from(sequence));


/*
   Note that the previous sequence can be traversed more than once because
   the items are part of the Symbol.iterator.
   However in this case, it can only be traversed once
*/
const onceSequence = {
  items: ["one", "two", "three", "catorce"],
  [Symbol.iterator]() {
    return {
      next: () => ({
        done: this.items.length === 0,
        value: this.items.shift()
      })
    };
  }
};

for (let item of onceSequence) {
  console.log(item);
}

console.log([...onceSequence]);

console.log(Array.from(onceSequence));