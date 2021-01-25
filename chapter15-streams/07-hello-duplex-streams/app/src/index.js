"use strict";

const { Duplex } = require("stream");

class HungryStream extends Duplex {
  constructor(options) {
    super(options);
    this.waiting = false;
  }

  _write(chunk, encoding, cb) {
    this.waiting = false;
    this.push(`\u001b[32m${ chunk }\u001b[39m`);
    cb();
  }

  _read() {
    if (!this.waiting) {
      this.push("Feed me some text> ");
      this.waiting = true;
    }
  }
}

const hungryStream = new HungryStream();
process.stdin.pipe(hungryStream).pipe(process.stdout);
