# 06-implementing-writable-stream
> implementing a writable stream

## Description
This example illustrates the implementation of a *Writable* stream that changes input text into green. 

In the example, we create a class `GreenStream` which extends from `stream.Writable` and implement the `_write()` method, which sends each of the chunks it receives to the *stdout* but in green color.

You can test the example using:
```bash
$ cat package.json | node ./app/src/index.js
```