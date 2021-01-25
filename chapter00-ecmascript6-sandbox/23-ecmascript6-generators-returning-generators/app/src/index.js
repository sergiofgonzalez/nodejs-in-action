"use strict";

const util = require("util");
util.inspect.defaultOptions.depth = null;

/* strings adhere to the iterator protocol */
const greeting = "Hello to Jason Isaacs!";
for (let c of greeting) {
  console.log(`c=${ c }`);
}

/* so we can have a generator function returning an iterator */
console.log("============");

function* greet() {
  yield* greeting;
}

console.log([...greet()]);

/* or even */
console.log("============");

function* greetMe(yourName = "sergio") {
  yield* "Hello to";
  yield* yourName;
}

console.log([...greetMe("Jason Isaacs")]);

/* In fact you can yield* anything that implements Symbol.iterator */
console.log("====================");
const salute = {
  [Symbol.iterator]() {
    const items = ["h", "e", "l", "l", "o", " ", "t", "o", " "];
    return {
      next: () => ({
        done: items.length === 0,
        value: items.shift()
      })
    };
  }
};

function* multiplied(base, multiplier) {
  yield base + 1 * multiplier;
  yield base + 2 * multiplier;
}

function* mix() {
  yield* salute;
  yield 0;
  yield* [1, 2];
  yield* [...multiplied(3, 2)];
  yield [...multiplied(6, 3)];
  yield* multiplied(15, 5);
}

console.log([...mix()]);