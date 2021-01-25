"use strict";

const assert = require("assert");
const runTest = require("./lib/trunner");


function stupidTest1() {
  const num = 5;
  assert.equal(num, 5);
}

async function stupidAsyncTest2() {
  assert.equal(await getNumber(), 5);
}


async function getNumber() {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve(5);
    }, 1500);
  });
}

runTest(stupidTest1, stupidAsyncTest2);