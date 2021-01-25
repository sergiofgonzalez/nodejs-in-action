"use strict";

console.time("test duration");

const assert = require("assert");

let testsCompleted = 0;



async function testCase() {
  async function getGreeting(str) {
    return str;
  }


  /* Arrange */
  const str = "Hello to Jason Isaacs!";
  
  /* Act */
  const result = await getGreeting(str);

  /* Assert */
  assert.equal(result, str, "Strings should be equal");
  testsCompleted++;
}

async function runTests() {
  try {
    await testCase();
  } catch (e) {
    console.error(`Error running the tests: ${ e }`);
  }

  console.log(`Completed ${testsCompleted} test${(testsCompleted === 1)? "" : "s" }`);
  console.timeEnd("test duration");
}

runTests();

