"use strict";

const util = require("util");
util.inspect.defaultOptions.depth = null;


/* use 1: converting an iterable object into an array */
function toArray() {
  return [...arguments];
}

console.log(toArray("a", "b", "c"));

/* use 2: splitting a string into its code points */
const codepoints = [..."hello"];
console.log(codepoints);

// you can put additional elements while using the spread operator
function cast() {
  return ["left", ...arguments, "right"];
}

console.log(cast("mid1", "mid2"));

/* use 3: flatten arrays */
const all = [1, ...[2, 3, 4], 5, ...[6], 7, ...[8, 9, 10]];
console.log(all);

/* use 4: combining assignment destructuring and spread to get specific elems from array */
const [first, second, ...rest] = ["a", "b", "c", "d", "e"];
console.log("first=%s, second=%s, rest:", first, second, rest);

/* use 5: spreading onto function calls */
function multiply(left, right) {
  return left * right;
}

console.log(multiply(...[2, 3]));

/* use 6: alternative to bind */
const date1 = new (Date.bind.apply(Date, [null, 2015, 11, 31]));
const date2 = new Date(...[2015, 11, 31]);
console.log(date1);
console.log(date2);

/* it can also be used as a wrapper for functions that do not receive iterable */
const maxNum = Math.max(5, 3, 2, 6, 7);
console.log(`maxNum=${ maxNum }`);

const nums = [5, 3, 2, 6, 7];
console.log(`max(nums)=${ Math.max(...nums) }`);