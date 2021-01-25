# 09-hello-fork

> using fork to create separate Node.js processes that communicates through IPC

## Description

This example illustrates how to write a program that creates a child Node.js process using `child_process` fork. 
This *forked process* is backed by a Node.js module that can communicate with the master through an evented interface.

In the example, the parent program sends messages to the child, and the child responds to the parent.

Parent:
```javascript
const child = child_process.fork(path.join(__dirname, 'child.js'));
child.on('message', message => {
  console.log(`child says: "${ message }"`);
  if (message === 'quit') {
    child.disconnect();
  }
});

child.send('Hello');
```

Child:
```javascript
process.on('message', msg => {
  if (msg === 'quit') {
    console.log(`received quit signal!`);
    process.send(`quit`);
  } else {
    process.send(`received: "${ msg }"`);
  }
});
```

There are a couple of things to notice:
+ Unless you do `child.disconnect()` the parent will remain active even when there is nothing left to do
+ The stdio from the child is directly connected to the stdio of the parent `stdio: [0, 1, 2, 'ipc']`. Therefore, will be no *child.stdin*, *child.stdout* or *child.stderr*.


In Node.js, the `child_process` module allows you to execute other applications (including Node applications).
It provides 4 different async methods that are intended for different scenarios:
+ `execFile` &mdash; execute an external application, given a set of arguments, and callback with the buffered output after the process exits.
+ `spawn` &mdash; execute an external application, given a set of arguments, and provide a streaming interface for I/O and events for when the process exits.
+ `exec` &mdash; execute one or more commands inside a shell an callback with the buffered output after the process exits.
+ `fork` &mdash; execute a Node module as a separate process, given a set of arguments, provide a streaming and evented interface like `spawn` and also set up an inter-process communication (IPC) channel between the parent and child process.

![child_process methods diagram](./child_process.png)