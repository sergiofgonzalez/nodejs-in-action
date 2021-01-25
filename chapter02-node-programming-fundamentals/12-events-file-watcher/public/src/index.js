"use strict";

const fs = require("fs");
const Watcher = require("./lib/watcher");

const watchDir = `./rsrc`;
const targetDir = `./target`;

const watcher = new Watcher(watchDir, targetDir);

watcher.on("process", filename => {
  console.log(`"process" event received for file "${filename}"`);
  const watchFilePath = `${watchDir}/${filename}`;
  const targetFilePath = `${targetDir}/${filename.toLowerCase()}`;
  fs.rename(watchFilePath, targetFilePath, err => {
    if (err) {
      console.log(`Error found while renaming ${watchFilePath} into ${targetFilePath}: ${err}`);
      throw err;
    }
    console.log(`successfully processed ${filename}`);
  });

});

console.log(`Establishing watcher on: ${watchDir}`);
watcher.start();