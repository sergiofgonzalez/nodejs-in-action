# e13-hello-process-next-tick
> introducing `process.nextTick` to make an operation asynchronous

## Description
The `process.nextTick` function allows you to register a synchronous function in the callback queue, so that it is handled asynchronously by the JavaScript runtime.

**Note**
`setImmediate()` function is almost the same thing as `process.nextTick`, but `setImmediate()` is easier to reason about, as it happens in a particular phase of the Node.js event loop:
+ `process.nextTick` &mdash; fires immediately, on the same phase
+ `setImmediate` &mdash; fires on the following iteration of the event loop, especifically on the `check` phase.

It is recommended to use `setImmediate()` instead of `process.nextTick()`.

### A Short Reminder about JavaScript Runtime
Remember that JavaScript features a regular call stack for synchronous operations, a callback queue for async operations and an event loop that is constantly checking the status of both.

The *event loop* gives priority to the *call stack* (sync operations), and only when the *call stack* is empty, inspects the *callback queue* to dequeue a previously registered callback and put it in the *call stack*.

That's why this is an infinite loop in JavaScript:
```javascript
let done = false;
setTimeout(() => done = true, 1000);

while (!done) {
  // noop
}

console.log("done");
```

The `setTimeout` registers the instruction `done=true` in the callback queue, and then starts executing the *while* loop, which is 100% sync and therefore, fills up the *call stack* and never lets the *event loop* dequeue the instruction that would allow the loop to finish.

Node.js documentation recommends to have APIs that are either 100% sync or async, as the mixture (as we've seen in the loop) brings situations that are difficult to debug and fix.




