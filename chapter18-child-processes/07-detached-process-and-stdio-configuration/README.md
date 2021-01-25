# 07-detached-process-and-stdio-configuration

> creating a detached child process from a Node.js parent program and severing all links to the child so that the parent can terminate and the child keeps running.

## Description

This example demonstrates how to start a detached process from a Node.js application using `spawn` so that it is unaffected with what happens with the parent process (normally, any child process will be terminated when the parent process is terminated).

In the example, we run a long running script stored in `scripts/` using `spawn`. This script writes a record every second to the file `execution-log.txt`.

Note that in the previous example, even when detaching, the parent process would remain active because the I/O of the child process would be still connected to the parent process. 

Node.js provides a way to control how the I/O from a child process will be redirected. The configuration receives an array in which the indexes correspond to file descriptors in the child process and the values indicate where the I/O for that particular file descriptor sould be redirected.

By default it's configured as:
```javascript
stdio: [ 'pipe', 'pipe', 'pipe' ]
```

meaning that file descriptors 0, 1 and 2 would be made available on the child object returned by `spawn` as child.stdio[0], child.stdio[1] and child.stdio[2]. Note also that FDs 0-2 are often referred to as `stdin`, `stdout` and `stderr`. Because those streams remain open while the child process is executing, the parent process would not die even when spawining with the *detached* mode.

In order to prevent that from happening you can either destroy those streams:
```javascript
child.stdin.destroy();
child.stdout.destroy();
child.stderr.destroy();
```

or you can do.

```javascript
  child_process.spawn(path.join(__dirname, 'scripts', 'long-running.sh'), [], 
    { 
      detached: true,
      stdio: ['ignore', 'ignore', 'ignore']
    });
```

However, the parent will remain active even when doing so, because the parent still maintains an internal reference to the child. In order to tell the system that you don't need that reference you can use:
```javascript
child.unref();
```

and then the parent will be able to exit while the detached process keeps working.

In Node.js, the `child_process` module allows you to execute other applications (including Node applications).
It provides 4 different async methods that are intended for different scenarios:
+ `execFile` &mdash; execute an external application, given a set of arguments, and callback with the buffered output after the process exits.
+ `spawn` &mdash; execute an external application, given a set of arguments, and provide a streaming interface for I/O and events for when the process exits.
+ `exec` &mdash; execute one or more commands inside a shell an callback with the buffered output after the process exits.
+ `fork` &mdash; execute a Node module as a separate process, given a set of arguments, provide a streaming and eventd interface like `spawn` and also set up an inter-process communication (IPC) channel between the parent and child process.

![child_process methods diagram](./child_process.png)