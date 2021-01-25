"use strict";

const { Transform } = require("stream");


class CSVParser extends Transform {
  constructor(options) {
    options = options || {};
    options.objectMode = true;
    super(options);

    this.value = "";
    this.headers = [];
    this.values = [];
    this.line = 0;
  }

  _transform(chunk, encoding, next) {
    chunk = chunk.toString(encoding || "utf8");
    for (let i = 0; i < chunk.length; i++) {
      const c = chunk.charAt(i);
      if (c === ",") {
        this.addValue();
      } else if (c === "\n") {
        this.addValue();
        if (this.line > 0) {
          this.push(this.toObject());
        }
        this.values = [];
        this.line++;
      } else {
        this.value += c;
      }
    }
    next(); 
  }

  toObject() {
    const obj = {};
    for (let i = 0; i < this.headers.length; i++) {
      obj[this.headers[i]] = this.values[i];
    }
    return obj;
  }

  addValue() {
    if (this.line === 0) {
      this.headers.push(this.value);
    } else {
      this.values.push(this.value);
    }
    this.value = "";
  }
}

module.exports = CSVParser;