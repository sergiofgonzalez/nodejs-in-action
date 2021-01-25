"use strict";

const util = require("util");
util.inspect.defaultOptions.depth = null;

/* super *ugly* old style variable parameters handling */
function join(delim, words) { // eslint-disable-line
  var wordsArray = Array.prototype.slice.call(arguments, 1);
  return wordsArray.join(delim);
}

console.log(`join(".", "one", "two", "three")=${join(".", "one", "two", "three")}`);

/* using ES6 rest parameters */
function prettyJoin(delim, ...words) {
  return words.join(delim);
}

console.log(`prettyJoin(".", "one", "two", "three")=${prettyJoin(".", "one", "two", "three")}`);

/* this can also be used in arrow functions */
const sumAll = (...numbers) => numbers.reduce((acc, num) => acc + num);
console.log(`sumAll(1, 2, 3)=${sumAll(1, 2, 3)}`);