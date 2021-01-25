"use strict";

const fs = require("fs");
const zlib = require("zlib");
const path = require("path");

function benchStream(inSize, outSize) {
  const time = process.hrtime();
  let watermark = process.memoryUsage().rss;

  const gzip = zlib.createGzip({ chunkSize: outSize });

  const input = fs.createReadStream("/usr/share/dict/words", { bufferSize: inSize });
  const output = fs.createWriteStream(path.join(__dirname, "data", "out.gz"));

  const memoryCheck = setInterval(() => {
    const rss = process.memoryUsage().rss;
    if (rss > watermark) {
      watermark = rss;
    }
  }, 50);

  input.on("end", () => {
    const memoryEnd = process.memoryUsage().rss;
    clearInterval(memoryCheck);

    const diff = process.hrtime(time);
    console.log([ inSize, outSize, (diff[0] * 1e9 + diff[1]) / 1e6, watermark / 1024, memoryEnd ].join(","));
  });

  input.pipe(gzip).pipe(output);

  return input;
}

console.log("file size, gzip size, ms, rss, end memory");

let fileSize = 128;
let zipSize = 5024;

function run(times) {
  benchStream(fileSize, zipSize)
    .on("end", () => {
      times--;
      fileSize *= 2;
      zipSize *= 2;

      if (times > 0) {
        run(times);
      }
    });
}

run (10);