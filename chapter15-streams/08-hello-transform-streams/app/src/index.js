"use strict";

const fs = require("fs");
const path = require("path");
const { Transform } = require("stream");

class CSVParser extends Transform {
  constructor(options) {
    super(options);
    this.value = "";
    this.headers = [];
    this.values = [];
    this.line = 0;
  }

  _transform(chunk, encoding, done) {
    const data = chunk.toString();
    for (let i = 0; i < data.length; i++) {
      const c = data.charAt(i);
      if (c === ",") {
        this.addValue();
      } else if (c === "\n") {
        this.addValue();
        if (this.line > 0) {
          this.push(JSON.stringify(this.toObject()));
        }
        this.values = [];
        this.line++;
      } else {
        this.value += c;
      }
    }
    done();
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

const csvParser = new CSVParser();
fs.createReadStream(path.join(__dirname, "data", "sample.csv"))
  .pipe(csvParser)
  .pipe(process.stdout);