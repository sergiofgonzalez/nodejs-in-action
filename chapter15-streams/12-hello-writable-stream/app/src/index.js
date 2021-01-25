"use strict";
const { Writable, Readable } = require("stream");

class WritableStream extends Writable {
  _write(chunk, enc, next) {
    console.log(`isBuffer: ${ Buffer.isBuffer(chunk) }: ${ chunk }`);
    next();
  }
}

/* to test the Writable stream */
const src = new Readable();

src.push("Hello");
src.push("to");
src.push("Jason");
src.push("Isaacs");
src.push("\n");
src.push(null);


const ws = new WritableStream();

src.pipe(ws);


/* using Buffers instead of strings */
const srcBuffer = new Readable();
srcBuffer.push(Buffer.from("Hello"));
srcBuffer.push(null);


srcBuffer.pipe(ws);


/* writing to a writable stream */
ws.write("Sending some random info to the stream");

// allowing some time for the other writes to complete
setTimeout(() => ws.end(), 5000);
