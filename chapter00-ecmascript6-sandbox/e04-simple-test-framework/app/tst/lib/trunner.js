"use strict";

const util = require("util");
util.inspect.defaultOptions.depth = null;


const stats = {};

async function runTests(...tests) {  
  stats.startHrTime = process.hrtime();
  stats.numTests = tests.length;
  stats.numSuccess = 0;
  stats.numFailed = 0;
  stats.errors = [];

  await runAllTests(tests);

  stats.duration = process.hrtime(stats.startHrTime);
  delete stats.startHrTime;
  console.log(`Finished: ${ util.inspect(stats) }`);
}

async function runTestCase(testFn) {
  testFn();
}


async function runAllTests(tests) {
  tests.forEach(async (test) => {
    if (typeof test !== "function") {
      stats.numFailed++;
      stats.errors.push(`${ test } is not a function`);
    } else {
      try {
        await runTestCase(test);
        stats.numSuccess++;
        stats.errors.push({});
      } catch (e) {
        stats.numFailed++;
        stats.errors.push(e.message);
      }
    }
  });
}

module.exports = runTests;