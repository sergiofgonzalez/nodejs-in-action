# 09-hello-readable-streams
> the basics of `stream.Readable`

## Description
This example introduces `stream.Readable` object.

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