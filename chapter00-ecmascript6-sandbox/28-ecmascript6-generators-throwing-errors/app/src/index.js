"use strict";

const util = require("util");
util.inspect.defaultOptions.depth = null;

function* numbers() {
  yield 1;
  yield 2;
  yield 3;
  throw new Error("Error in the generator function");
}

const g = numbers();
while (true) { // eslint-disable-line no-constant-condition
  try {
    let item = g.next();
    if (item.done) {
      break;
    }
    console.log(item.value);
  } catch (e) {
    console.log(`An error has occurred:`, e);
  }
}


function* words() {
  yield "this";
  yield "is";
  yield "your";
  yield "life";
}

function displayWords(words) {
  const g = words();
  let item;
  while (true) { // eslint-disable-line no-constant-condition
    item = g.next();
    if (item.done) {
      break;
    }
    if (item.value === "your") {
      g.throw(`'your' is not an allowed word`);
    }
    console.log(item.value);
  }
}

function doThings() {
  console.log(`About to display some words`);
  try {
    displayWords(words);
  } catch (e) {
    console.error(`Hey, some error was caught!`, e);
  }
}

doThings();


