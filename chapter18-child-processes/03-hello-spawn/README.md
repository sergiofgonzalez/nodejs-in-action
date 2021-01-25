# 03-hello-spawn
> executing a non-Node application streaming the results

## Description
This example illustrates how invoke an external application using `spawn`, which instead of buffering the results, returns an stream with the information produced by the external command.

In the program, two use-cases are illustrated, in the first one, the results are buffered directly to *stdout* and *stderr* and in the second one, the results are piped into custom writable streams.

In Node.js, the `child_process` module allows you to execute other applications (including Node applications).
It provides 4 different async methods that are intended for different scenarios:
+ `execFile` &mdash; execute an external application, given a set of arguments, and callback with the buffered output after the process exits.
+ `spawn` &mdash; execute an external application, given a set of arguments, and provide a streaming interface for I/O and events for when the process exits.
+ `exec` &mdash; execute one or more commands inside a shell an callback with the buffered output after the process exits.
+ `fork` &mdash; execute a Node module as a separate process, given a set of arguments, provide a streaming and eventd interface like `spawn` and also set up an inter-process communication (IPC) channel between the parent and child process.

![child_process methods diagram](./child_process.png)