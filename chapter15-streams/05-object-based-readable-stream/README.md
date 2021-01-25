# 05-object-based-readable-stream
> illustrating how to implement an object-based readable stream

## Description
This example illustrates the implementation of a *Readable* stream that uses object instead of strings or bytes as input. The change consist in setting the `options.objectMode = true` and using it to configure the underlying readable stream.

```javascript
class MemStatusStream extends Readable {
  constructor(options) {
    options = options || {};
    options.objectMode = true;
    super(options);
  }

  _read() {
    this.push(process.memoryUsage());
  }
}
```

