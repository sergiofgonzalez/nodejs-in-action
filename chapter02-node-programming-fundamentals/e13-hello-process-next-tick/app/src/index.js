"use strict";

const { EventEmitter } = require("events");
const fs = require("fs");


/* 
  This won't display the message because the event
  is emitted before the listener is registered
*/

(() => {
  function complexOperations() {
    const events = new EventEmitter();
    events.emit("success");
    return events;
  }

  console.log("Scenario 1");
  complexOperations().on("success", () => console.log("success!"));
})();

/* 
  You can fix this by doing that operation asynchronously.
  By using `process.nextTick` you register the emission 
  of the success event on the callback queue, thus decoupling
  the execution of the listener registration from the 
  event triggering.

  Remember, JavaScript runtime features a call stack for non
  async operations and a callback queue (or task queue) for async operations.
  The event loop takes a look at both and works like this:
    + Look in the call stack, if it's not empty don't do anything
    + Otherwise, look at the call stack:
      + if the call stack is empty, dequeue the first item in the callback queue
        and push it at the top of the call stack.
      + if the call stack is not empty, 

  `process.nextTick` is the same as `setTimeout(..., 0)`.
*/

(() => {
  function complexOperations() {
    const events = new EventEmitter();
    process.nextTick(() => events.emit("success"));
    return events;
  }

  console.log("Scenario 2");
  complexOperations().on("success", () => console.log("success!"));
})();

/* 
    A more involved example:
    + A function is defined that accepts a callback argument.
    + The function reads a file if not cached, otherwise
      returns the cached version.
    + When returning the cached version, there is no need for
      an async operation, then the API would not be 100% sync or async.
    + Therefore, we use process.nextTick to make the return of the cached
      version async, and therefore the function would be 100% async
*/
(() => {
  console.log("Scenario 3");
  let content;
  function readFileIfNotCached(cb) {
    if (!content) {
      fs.readFile(__filename, "utf8", (err, data) => {
        console.log("fs.readFile issued");
        content = data;
        cb(err, content);        
      });
    } else {
      process.nextTick(() => {
        console.log("File already cached!");
        cb(null, content);
      });
    }
  }

  readFileIfNotCached((err, data) => {
    console.log("First call: Length:", data.length);

    readFileIfNotCached((err, data) => {
      console.log("Second call: Length:", data.length);
    });
  });
})();

/*
  setImmediate() is almost the same thing, but it's easier to reason about
*/

(() => {
  function complexOperations() {
    const events = new EventEmitter();
    setImmediate(() => events.emit("success"));
    return events;
  }

  console.log("Scenario 3");
  complexOperations().on("success", () => console.log("success!"));
})();