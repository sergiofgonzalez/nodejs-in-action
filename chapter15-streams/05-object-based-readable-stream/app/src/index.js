"use strict";

const { Readable } = require("stream");

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

const memStatusStream = new MemStatusStream();

memStatusStream.on("readable", () => {
  const output = memStatusStream.read();
  console.log("Type: %s, value: %j", typeof output, output);
});