"use strict";
const { Readable } = require("stream");

/* Basic example: providing data one char at a time */
(() => {
  class SrcStream extends Readable {
    constructor() {
      super();
      this.c = "A".charCodeAt(0);
    }

    _read(size) {
      // you can comment the following line for pretty printing but it's interesting to
      // know how the stdout is calling us
      console.log(`Received _read(${ size }) invocation from the consumer stream`);
      this.push(String.fromCharCode(this.c++));
      if (this.c > "z".charCodeAt(0)) {
        this.push(null);
      }
    }
  }

  const srcStream = new SrcStream();

  srcStream.pipe(process.stdout);
})();

/* Providing data one char at a time with some delay */
(() => {
  class SrcStream extends Readable {
    constructor() {
      super();
      this.c = "A".charCodeAt(0);
      this.readCallCount = 0;
    }

    _read() {
      this.readCallCount++;
      if (this.c > "z".charCodeAt(0)) {
        return this.push(null);
      }
      setTimeout(() => {
        this.push(String.fromCharCode(this.c++));
      }, 1000);
    }
  }

  const srcStream = new SrcStream();

  srcStream.pipe(process.stdout);
})();