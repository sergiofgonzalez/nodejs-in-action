"use strict";

const { Readable, Writable } = require("stream");
const { StringDecoder } = require("string_decoder");

const decoder = new StringDecoder("utf8");

class MemoryStream extends Readable {
  constructor() {
    super();
    this.isTTY = process.stdout.isTTY;
  }

  _read() {
    const text = `${ JSON.stringify(process.memoryUsage()) }\n`;
    if (this.isTTY) {
      this.push(`\u001b[32m${ text }\u001b[39m`);
    } else {
      this.push(text);
    }
  }
}

class OutputStream extends Writable {
  constructor() {
    super();
    this.on("pipe", dest => dest.isTTY = this.isTTY);
  }

  _write(chunk, encoding, next) {
    console.log(decoder.write(chunk));
    next();
  }
}

const memoryStream = new MemoryStream();

const mode = "non-stdout";
if (mode === "stdout") {
  memoryStream.pipe(process.stdout);
} else {
  memoryStream.pipe(new OutputStream());
}

