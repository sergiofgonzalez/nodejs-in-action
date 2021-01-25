"use strict";

const fs = require("fs");
const { promisify } = require("util");
const path = require("path");
const readFileAsync = promisify(fs.readFile);

/*
  Hello Buffer!
    Allocating a Buffer of 255 bytes
    Check memory before and after the allocation
*/

(() => {
  const memBefore = process.memoryUsage();
  const buffer = new Buffer(255);
  buffer[0] = 23;
  const memAfter = process.memoryUsage();

  const memDiff = {};
  for (const memProp in memBefore) {
    memDiff[memProp] = memBefore[memProp] - memAfter[memProp];
  }
  console.log("Before:", memBefore);
  console.log("After :", memAfter);
  console.log("Memory:", memDiff);
})();

/*
  Reading file returns a Buffer
*/
(async () => {
  try {
    const data = await readFileAsync(__filename);
    if (Buffer.isBuffer(data)) {
      console.log("Data read is a binary buffer!");
    }
  } catch (err) {
    console.log("Error found: ", err.message);
    process.exit(1);
  }
})();

/*
  Turning a binary buffer into plain text
*/
(async () => {
  try {
    const data = await readFileAsync(path.join(__dirname, "data", "names.txt"));
    console.log(data.toString("ascii"));
  } catch (err) {
    console.log("Error found: ", err.message);
    process.exit(1);
  }
})();
