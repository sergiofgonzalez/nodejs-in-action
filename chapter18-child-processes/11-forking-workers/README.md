# 11-forking-workers

> using `fork` to create a basic platform that distributes tasks to workers that run on their own process.

## Description

This example illustrates how to write a program that handles the distribution of tasks from a parent process to a set of children who run on their own process.

The parent exposes a function:
```javascript
function doWork(job, cb) {
  ...
}
```

that can be used to submit tasks to children workers. Inside that function the following events are controlled:
+ `message` &mdash; used to receive the signal and resulting object when the worker successfully processed its task
+ `error` &mdash; when the worker fails with an exception while processing (this does not work)
+ `exit` &mdash; when the worker exits unexpectedly

The processing is callback-based, and it is controlled that the callback is called twice (for instance, if the child completed processing, but then it exits unexpectedly).

The worker is a simple processor that waits for a random number of seconds, and that can also randomly throw an exception.

**NOTE on parent-child exception handling:**
Note that the exception handling is not being propagated to the parent, so the error handling is not working as expected. Apparently, the way to do it should be to add a `process.on('uncaughtException', ...)` in the worker and send an specific message to the parent indicating the error:


In Node.js, the `child_process` module allows you to execute other applications (including Node applications).
It provides 4 different async methods that are intended for different scenarios:
+ `execFile` &mdash; execute an external application, given a set of arguments, and callback with the buffered output after the process exits.
+ `spawn` &mdash; execute an external application, given a set of arguments, and provide a streaming interface for I/O and events for when the process exits.
+ `exec` &mdash; execute one or more commands inside a shell an callback with the buffered output after the process exits.
+ `fork` &mdash; execute a Node module as a separate process, given a set of arguments, provide a streaming and eventd interface like `spawn` and also set up an inter-process communication (IPC) channel between the parent and child process.

![child_process methods diagram](./child_process.png)