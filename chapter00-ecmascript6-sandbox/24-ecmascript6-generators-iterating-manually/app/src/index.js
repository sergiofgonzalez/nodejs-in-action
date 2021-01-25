"use strict";

const util = require("util");
util.inspect.defaultOptions.depth = null;

function* numbers() {
  yield 1;
  yield 2;
  yield 3;
}


/*
   We already saw in the hello-generators example
   how to manually iterate over the sequence given
   by a generator function
*/
const g = numbers();
while (true) {  // eslint-disable-line no-constant-condition
  let item = g.next();
  if (item.done) {
    break;
  }
  console.log(`value=${ item.value }`);
}

/*
  The beauty of it is that while manually iterating
  you're not constrained to synchrnous operations
*/
const g1 = numbers();
for (let i = 0; i < 4; i++) {
  setTimeout(() => {
    const randVal = Math.random();
    const item = g1.next();
    if (!item.done) {
      const val = item.value;
      console.log(`total=${ randVal } + ${ val }=${ randVal + val }`);
    } else {
      throw new Error(`No more data in the sequence`);
    }
  }, 1000 * (i + 1));
}

