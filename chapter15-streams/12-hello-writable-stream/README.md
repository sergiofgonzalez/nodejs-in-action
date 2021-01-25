# 12-hello-writable-streams
> the basics of `stream.Writable`

## Description
This example introduces `stream.Writable` object.

Writable streams are streams that **consume** data and therefore you can `pipe()` to but not from.
```javascript
src.pipe(writableStream);
```

When using a writable stream, you have to implement a `._write(chunk, enc, next)` function.

To write to writable stream, you can call `.write(data)`. Once you're done with the writable stream just call `.end()`. Trying to write on a writable stream that has been closed throws an error.
