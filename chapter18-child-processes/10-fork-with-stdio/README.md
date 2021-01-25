# 10-fork-with-stdio

> using fork to create separate Node.js processes that communicates through IPC and uses a streaming interface for stdio

## Description

This example illustrates how to write a program that creates a child Node.js process using `child_process` fork. 
This *forked process* is backed by a Node.js module that can communicate with the master through an evented  and streamed interface.

In this example, it is used the option `{silent: true}` which changes the way on which the stdio is configured.
You will see that no messages from the child's stdout are automatically printed on the console, but you get the *child.stdin*, *child.stdout* and *child.stderr* streams on the parent.


In Node.js, the `child_process` module allows you to execute other applications (including Node applications).
It provides 4 different async methods that are intended for different scenarios:
+ `execFile` &mdash; execute an external application, given a set of arguments, and callback with the buffered output after the process exits.
+ `spawn` &mdash; execute an external application, given a set of arguments, and provide a streaming interface for I/O and events for when the process exits.
+ `exec` &mdash; execute one or more commands inside a shell an callback with the buffered output after the process exits.
+ `fork` &mdash; execute a Node module as a separate process, given a set of arguments, provide a streaming and eventd interface like `spawn` and also set up an inter-process communication (IPC) channel between the parent and child process.

![child_process methods diagram](./child_process.png)