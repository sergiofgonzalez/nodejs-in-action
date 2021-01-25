# 04-hello-file-descriptors
> working with *file descriptors* in Node

## Description

*File Descriptors (fds)* are integers associated with open files within a process managed by the operating system. It is the OS the one who keeps track of all the open files and assign those integers.

Note that file descriptors can point to files, directories, pipes, network sockets...

The following table lists the common file descriptors:
| Stream | File Descriptor | Description       |
|--------|-----------------|-------------------|
| stdin  | 0               | standard input    |
| stdout | 1               | standard output   |
| stderr | 2               | standard error    |

therefore, the following operations are equivalent:
```javascript
console.log("Hello, stdout!");
process.stdout.write("Hello, stdout!");
fs.writeSync(1, "Hello, stdout!");
```

You get a file descriptor as a result of using the `open` or `openSync` operations. Once you have the file descriptor, you can use it for the fd-based low-level operations.