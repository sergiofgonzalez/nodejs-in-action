"use strict";

const zlib = require("zlib");

const database = [ [], [], [], [], [], [], [], [] ];
const bitmasks = [ 1,  2,  4,  8,  16, 32, 64, 128 ];

function store(buf) {
  const db = buf[0]; // db indicator
  const key = buf.readUInt8(1); // key

  // 0x78 is a zlib deflated marker
  if (buf[2] === 0x78) {
    zlib.inflate(buf.slice(2), (err, inflatedBuf) => {
      if (err) {
        console.error("Could not inflate contents", err.message);
        process.exit(1);
      }
      const data = inflatedBuf.toString();

      bitmasks.forEach((bitmask, index) => {
        if ((db & bitmask) === bitmask) {
          database[index][key] = data;
        }
      });
      console.log("updated db", database);
    });
  }
}

zlib.deflate("Hello to Jason Isaacs!", (err, deflatedBuf) => {
  const header = new Buffer(2);
  header[0] = 0x8; // store in 5th db: 00001000
  header[1] = 0;   // key=0

  const message = Buffer.concat([header, deflatedBuf]);
  store(message);
});

