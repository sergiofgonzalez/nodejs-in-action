"use strict";

const fs = require("fs");
const path = require("path");
const util = require("util");

const open = util.promisify(fs.open);
const write = util.promisify(fs.write);
const close = util.promisify(fs.close);
const unlink = util.promisify(fs.unlink);
const writeFile = util.promisify(fs.writeFile);
const mkdir = util.promisify(fs.mkdir);
const rmdir = util.promisify(fs.rmdir);

/* strategy 1: just try to get a "wx" lock using open file */
// (async () => {
//   try {
//     await open(path.join(__dirname, "data", "file.txt.lockfile"), "wx");
//     const fd = await open(path.join(__dirname, "data", "file.txt"), "a");
//     write(fd, Buffer.from(`Hello to Idris Elba @ ${ new Date().toISOString() }\n`));
//     close(fd);
//     await unlink(path.join(__dirname, "data", "file.txt.lockfile"));
//   } catch (e) {
//     console.log("Error performing operations on file:", e.message);
//   }
// })();

/* strategy 2: get a "wx" lock while writing some contents to the file */
(async () => {
  try {
    await writeFile(path.join(__dirname, "data", "file.txt.lockfile"), { pid: process.pid, accessed: new Date().toISOString() }, { flags: "wx" });
    const fd = await open(path.join(__dirname, "data", "file.txt"), "a");
    write(fd, Buffer.from(`Hello to Idris Elba @ ${ new Date().toISOString() }`));
    close(fd);
    await unlink(path.join(__dirname, "data", "file.txt.lockfile"));    
  } catch (e) {
    console.log("Error performing operations on file:", e.message);
  }
})();

/* strategy 3: lock files with mkdir as it works well across platforms, network drives, etc. */
(async () => {
  try {
    await mkdir(path.join(__dirname, "data", `file.txt.lock/${ process.pid }`));
    const fd = await open(path.join(__dirname, "data", "file.txt"), "a");
    write(fd, Buffer.from(`Hello to Ahmed Riz @ ${ new Date().toISOString() }`));
    close(fd);
    await rmdir(path.join(__dirname, "data", `file.txt.lock/${ process.pid }`));    
  } catch (e) {
    console.log("Error performing operations on file:", e.message);
  }
})();