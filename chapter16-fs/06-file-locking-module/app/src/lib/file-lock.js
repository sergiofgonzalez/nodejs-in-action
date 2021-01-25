"use strict";

const fs = require("fs");
const path = require("path");

let hasLock = false;
const lockDir = "file.txt.lock";

exports.lock = cb => {
  if (hasLock) {
    return cb;
  }

  fs.mkdir(lockDir, err => {
    if (err) {
      return cb(err);
    }
    const filePath = path.join(lockDir, process.pid.toString());
    fs.writeFile(filePath, { pid: process.pid, accessed: new Date().toISOString() }, err => {
      if (err) {
        console.error(err.message);
      }
      hasLock = true;
      return cb();
    });
  });
};

exports.unlock = cb => {
  if (!hasLock) {
    return cb();
  }

  fs.unlink(path.join(lockDir, process.pid), err => {
    if (err) {
      return cb(err);
    }
    fs.rmdir(lockDir, err => {
      if (err) {
        return cb(err);
      }
      hasLock = false;
      cb();
    });
  });
};

process.on("exit", () => {
  if (hasLock) {
    fs.unlinkSync(path.join(lockDir, process.pid.toString()));
    fs.rmdirSync(lockDir);
    console.log("Lock removed while exiting the process");
  }
});