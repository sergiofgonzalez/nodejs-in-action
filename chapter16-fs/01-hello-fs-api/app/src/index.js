"use strict";

const fs = require("fs");
const path = require("path");
const assert = require("assert");

fs.readdir(__dirname, (err, files) => {
  console.log(files);
});

// Some operations
fs.unlinkSync(path.join(__dirname, "data", "file.txt"));
fs.rmdirSync(path.join(__dirname, "data"));
fs.mkdirSync(path.join(__dirname, "data"));
const fd = fs.openSync(path.join(__dirname, "data", "file.txt"), "w+");
const writeBuf = new Buffer(`Hello to Jason Isaacs @ ${ new Date().toISOString() }`);
fs.writeSync(fd, writeBuf, 0, writeBuf.length, 0);

const readBuf = new Buffer(writeBuf.length);
fs.readSync(fd, readBuf, 0, writeBuf.length, 0);

assert.equal(writeBuf.toString("utf8"), readBuf.toString("utf8"));

fs.closeSync(fd);