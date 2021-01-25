"use strict";

const Stream = require("stream");

const stream = new Stream();
stream.readable = true;

let c = 64;
const iv = setInterval(() => {
  if (++c >= 75) {
    clearInterval(iv);
    stream.emit("end");
  } else {
    stream.emit("data", String.fromCharCode(c));
  }
}, 750);

stream.pipe(process.stdout);