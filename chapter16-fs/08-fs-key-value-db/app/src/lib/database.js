"use strict";

const fs = require("fs");
const { EventEmitter } = require("events");

class Database extends EventEmitter {
  constructor(path) {
    super();
    this.path = path;
    this._records = Object.create(null);
    this._writeStream = fs.createWriteStream(this.path, { encoding: "utf8", flags: "a" });

    this._load();
  }

  _load() {
    const stream = fs.createReadStream(this.path, { encoding: "utf8" });
    let data = "";
    stream.on("readable", () => {
      data += stream.read();
      const records = data.split("\n");
      data = records.pop(); // discard the latest \n
      records.forEach(record => {
        try {
          const jsonRecord = JSON.parse(record);
          if (jsonRecord.value === null) {
            delete this._records[jsonRecord.key];
          } else {
            this._records[jsonRecord.key] = jsonRecord.value;
          }
        } catch (e) {
          this.emit("error", "found invalid record", record);
        }
      });      
    });
    stream.on("end", () => this.emit("load"));
  }

  get(key) {
    return this._records[key] || null;
  }

  set(key, value, cb) {
    const toWrite = `${ JSON.stringify({ key: key, value: value }) }\n`;
    if (value === null) {
      delete this._records[key];
    } else {
      this._records[key] = value;
    }
    this._writeStream.write(toWrite, cb);
  }

  del(key, cb) {
    return this.set(key, null, cb);
  }
}

module.exports = Database;