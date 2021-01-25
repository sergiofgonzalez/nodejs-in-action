"use strict";

const fs = require("fs");
const events = require("events");

class Watcher extends events.EventEmitter {
  constructor(watchDir, targetDir) {
    super();
    this.watchDir = watchDir;
    this.targetDir = targetDir;
  }

  watch() {
    fs.readdir(this.watchDir, (err, files) => {
      if (err) {
        console.log(`An error has been caught while processing the ${this.watchDir} directory: ${err}`);
        throw err;
      }
      files.forEach(file => this.emit("process", file));
    });
  }

  start() {
    fs.watchFile(this.watchDir, () => this.watch());
  }
}

module.exports = Watcher;