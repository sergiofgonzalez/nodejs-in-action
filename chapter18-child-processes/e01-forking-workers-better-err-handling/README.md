# e01-forking-workers-better-err-handling

> using `fork` to create a basic platform that distributes tasks to workers that run on their own process, with better error handling

## Description

This example illustrates how to write a program that handles the distribution of tasks from a parent process to a set of children who run on their own process.

The base capabilities were implemented on [11-forking-workers](../11-forking-workers/), and in this example, better error handling has been added.

In the worker, an error condition is randomly raised. When that happens, an object with the error description is sent to the parent using `process.send()`. Then, on the parent, the result of the message is checked to verify if it's an object, and if it is so, check whether it features the err property (see below for the rationale for not using an `Error` object).
When that happens, the message is identified as an error.

There are a few things to consider:
+ You cannot send an error object from the child to the parent &mdash; if you do `process.send(new Error(...))` the parent receives `{}`. It doesn't even work if you do *JSON.stringify* the error before submitting it.
+ You cannot easily debug the child processes, because they inherit the same environment as the parent, and you get the *failed address already in use* error. In order to do that, you need to pass an extra object to *fork*:
```javascript
  const child = child_process.fork(path.join(__dirname, `worker`), [], {execArgv: ['--inspect=9223']});
```

This will allow you debug the parent, as the child will use a different port. If you wanted to debug the child, you could also use `--inspect-brk`.
