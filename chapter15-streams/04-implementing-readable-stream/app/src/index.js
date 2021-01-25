"use strict";

const stream = require("stream");
const util = require("util");
const fs = require("fs");
const path = require("path");

util.inspect.defaultOptions.depth = null;


class JSONLineReader extends stream.Readable {
  constructor(source) {
    super();
    this._source = source;
    this._buffer = "";

    source.on("readable", () => {
      console.log("readable event received!");
      this.read(12);
    });
  }

  _read() {   
    let lineIndex;

    if (this._buffer.length === 0) {
      const chunk = this._source.read();
      this._buffer += chunk;
    }

    lineIndex = this._buffer.indexOf("\n");

    if (lineIndex !== -1) {
      const line = this._buffer.slice(0, lineIndex);
      if (line) {
        const result = JSON.parse(line);
        this._buffer = this._buffer.slice(lineIndex + 1);
        this.emit("object", result);
        this.push(util.inspect(result));
      } else {
        this._buffer = this._buffer.slice(1);
      }
    }
  }
}

const input = fs.createReadStream(path.join(__dirname, "data", "json-lines.txt"), { encoding: "utf8" });

const jsonLineReader = new JSONLineReader(input);

jsonLineReader.on("object", obj => console.log(`obj: ${ util.inspect(obj) }`));