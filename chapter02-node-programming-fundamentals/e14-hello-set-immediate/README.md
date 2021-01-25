# e14-hello-set-immediate
> introducing `setImmediate` to make an operation asynchronous

## Description
The `setImmediate` function allows you to register a callback to run at the end of this turn of the Node.js event loop. 

The Node.js event loop has a callback queue that classifies the operations to take place according to its nature.
+ timers &mdash; where callbacks scheduled by setTimeout and setInterval are executed
+ I/O callbacks &mdash; where all callbacks are executed except for close callbacks (like socket.on("close", ...))
the ones scheduled by timers and setImmediate() ones
+ idle, prepare &mdash; used internally by the runtime
+ poll &mdash; the ones that retrieve new I/O events
+ check &mdash; where setImmediate callbacks are invoked
+ close callbacks &mdash; where callbacks that close external resources are executed

Therefore:
+ `setImmediate()` is designed to be executed right after the poll phase completes
+ `setTimeout()` schedules a callback to be run after a min threshold
+ `process.nextTick()` fires the callback in an async way immediately, no matter the phase


As a consequence:
+ If there is no I/O involved, `setImmediate` and `setTimeout` execution is non-deterministic: any of it can happen before the other.
+ If there is I/O involved, `setImmediate` will happen before `setTimeout`.
+ `process.nextTick` is *more immediate* than `setImmediate()`, as it will happen in the next tick no matter the phase. For this reason, `setImmediate()` is better behaved and easier to reason about.
