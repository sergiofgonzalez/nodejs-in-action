"use strict";

const util = require("util");
util.inspect.defaultOptions.depth = null;

function* abc() {
  yield "a";
  yield "b";
  yield "c";
}

console.log(`Array.from(abc())=${ Array.from(abc()) }`);
console.log(`[...abc()]=${ [...abc()] }`);
for (let c of abc()) {
  console.log(`c=${ c }`);
}




console.log("================");
const genFn = abc();
let { done, value } = genFn.next(); 
while (!done) { 
  console.log(`value=${ value }`);
  const nextObj = genFn.next();
  done = nextObj.done;
  value = nextObj.value;
}

console.log("================");
const g = abc()[Symbol.iterator]();
let { done: done1, value: value1 } = g.next();
while (!done1) { 
  console.log(`value=${ value1 }`);
  const nextObj = g.next();
  done1 = nextObj.done;
  value1 = nextObj.value;
}


/* This won't work, not entirely sure why */
/*
const next = abc().next;
let { done1, value1 } = next();
while (!done1) { 
  console.log(`value=${ value1 }`);
  const nextObj = next();
  done1 = nextObj.done;
  value1 = nextObj.value;
}
*/

/* generators can also trigger side-effects and not only yield values */
function* numbers() {
  console.log("1 is about to be yielded");
  yield 1;
  console.log("2 is about to be yielded");
  yield 2;
  console.log("3 is about to be yielded");    
  yield 3;
}

for (let num of numbers()) {
  console.log(`num=${ num }`);
}

console.log([...numbers()]);

/*
  Once the end of the generator has been reached the function will signal { done: true }
  for the subsequent calls asking for the next element in the sequence
*/
console.log("================");

const g1 = numbers();
for (let i = 0; i < 5; i++) {
  console.log(`g1.mext()=${ util.inspect(g1.next()) }`);
}