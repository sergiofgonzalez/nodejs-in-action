"use strict";

const debug = require("debug")("countstream");
const Writable = require("stream").Writable;

class CountStream extends Writable {
  constructor(matchText, options) {
    super(options);
    this.count = 0;
    this.matcher = new RegExp(matchText, "ig");
  }

  _write(chunk, encoding, cb) {
    debug(`Looking for matches in ${ chunk }`);
    const matches = chunk.toString().match(this.matcher);
    if (matches) {
      this.count += matches.length;
    }
    cb();
  }

  end() {
    this.emit("total", this.count);
  }
}

module.exports = CountStream;
