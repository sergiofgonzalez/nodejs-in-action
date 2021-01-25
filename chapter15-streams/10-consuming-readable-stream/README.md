# 10-consuming-readable-stream
> consuming data from a `stream.Readable`

## Description
This example illustrates how to consume data from a `stream.Readable` object.

Most of the times, *readable* streams would be just piped into the consuming stream, but learning how to consume directly from it lets you understand the techniques behind it.

When data is available on *readable* stream and `readable` event will be fired, and then you will be able to call the `read()` method on the source stream.

```javascript
readableStream.on("readable", () => {
  const buf = readableStream.read();
  console.log(buf.toString("utf8"));
});
```

The `read(size)` method can be used to pass an advisory number of bytes that you want to be returned from the stream.
