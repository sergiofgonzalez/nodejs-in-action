# 07-hello-duplex-streams
> implementing a duplex stream

## Description
This example illustrates how to implement and use a duplex stream.

In the program, we implement a class that extends from `stream.Duplex` with its `_read()` and `write()` methods.

```javascript
process.stdin.pipe(hungryStream).pipe(process.stdout);
```

Note that duplex streams can sit in the middle of pipes