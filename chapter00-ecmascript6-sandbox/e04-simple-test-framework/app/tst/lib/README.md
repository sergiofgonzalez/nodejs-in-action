# tRunner
> a minimalist test runner for Node.js

# Description
A minimalist test runner for Node.js.

Although that apparently you don't need a test runner in Node.js applications, it's always a good thing to have some support to be able to obtain some reporting information, etc.

# Requirements
This is what i want:
+ simple API: e.g. send the functions to be tested in an array to the runner
+ Do not stop execution if the execution of a test case fails, the others should be tested
+ Basic information about number of tests run, number of failed tests etc. and duration should be returned by the runner
+ Runner should work for both sync and async code seamlessly

## Current Implementation Status

+ API: `function (tests) {...}` defined as an async function

+ An stats object is defined in the module keeping track of:
  + number of tests to run
  + number of success and failed test cases run
  + an array with errors collected on each of the test cases execution
  + a high resolution time entry

+ The main function is defined as an async function, then all of the tests are run using `forEach` and are also wrapped in async functions.

+ Each of the test cases are executed within try-catch blocks