# e01-pushing-chunks-on-demand
> generating data to a `stream.Readable` when the destination asks for it

## Description
This illustrate how you can use the `_read()` method on a `Readable` as a signal that the consumer stream (the destination of the `pipe()`) is ready to consume data.

This is a more efficient technique than just pushing the data unnecessarily without really knowing if the destination is ready to consume them. 

The `_read(size)` method gets optionally a size that the consumer would like to received, but you can ignore that value in the implementation. In our example, we're pushing the data one character at a time, so the *stdout* is forced to call `_read()` many times, as can be seen when executing the program.

Readable streams **produce** data that can be fed into a target stream (writable, transform, duplex...) using `pipe()`.

`Readable` exposes a method `push` that you can use to make data available to the readable stream. When you use this method, the *chunks* are being buffered until a consumer stream is ready to read them.

In our example we do:
```javascript
const src = new Readable();

src.push("chunk1");
console.log("push!");

src.push("chunk2");
console.log("push!");

src.push("\n");
console.log("push!");

src.push(null);
console.log("push!");

src.pipe(process.stdout);
```

And the output shows the logs the logs for the 3 pushes before the whole contents are displayed on *stdout* because the contents are buffered before they are made available via `pipe()` to the *stdout*.