"use strict";

const fs = require("fs");

/* 
  timeout vs. setImmediate

  Node.js inspection of the callback queue has different phases in which different
  types of async operations are taken into account with different priorities:
    + timers: where callbacks scheduled by setTimeout and setInterval are executed
    + I/O callbacks: where all callbacks are executed except for close callbacks (like socket.on("close", ...))
      the ones scheduled by timers and setImmediate() ones
    + idle, prepare: used internally by the runtime
    + poll: the ones that retrieve new I/O events
    + check: where setImmediate callbacks are invoked
    + close callbacks: where callbacks that close external resources are executed

    Thus:
      + setImmediate() is designed to be executed right after the poll phase completes
      + setTimeout() schedules a callback to be run after a min threshold

    If there is no I/O involved, setTimeout vs. setImmediate execution is 
    non-deterministic.
*/


(() => {
  console.log("Scenario 1: no I/O involved");
  setTimeout(() => console.log("SC1: setTimeout()"), 0);
  setImmediate(() => console.log("SC1: setImmediate()"));
})();



/* 
  timeout vs. setImmediate (Part 2)
  If there's some I/O involved, setImmediate will always happen before any timers
*/
(() => {
  console.log("Scenario 2: I/O involved");
  fs.readFile(__filename, () => { 
    setTimeout(() => console.log("SC2: setTimeout()"), 0);
    setImmediate(() => console.log("SC2: setImmediate()"));
  });
})();

/*
  process.nextTick vs. setImmediate

  process.nextTick fires immediately on the same phase
  setImmediate fires on the following iteration (tick) of the event loop

  Thus, process.nextTick executes before setImmediate, although the functionality is similar.

  It is recommended to use `setImmediate()` because it's easier to reason about 
*/
(() => {
  console.log("Scenario 3: I/O involved");
  fs.readFile(__filename, () => { 
    process.nextTick(() => console.log("SC3: process.nextTick()"), 0);
    setImmediate(() => console.log("SC3: setImmediate()"));
  });
})();