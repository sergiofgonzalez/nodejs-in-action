"use strict";

const fs = require("fs");
const { join } = require("path");
const { promisify } = require("util");

const readdirAsync = promisify(fs.readdir);
const statAsync = promisify(fs.stat);



exports.findSync = (nameRegex, startPath) => {
  const results = [];

  function finder(path) {
    const files = fs.readdirSync(path);

    files.forEach(file => {
      const fpath = join(path, file);
      const stats = fs.statSync(fpath);

      if (stats.isDirectory()) {
        finder(fpath);
      }
      if (stats.isFile() && nameRegex.test(file)) {
        results.push(fpath);
      }
    });
  }

  finder(startPath);
  return results;
};

exports.find = (nameRegex, startPath, cb) => {
  const results = [];
  let asyncOps = 0;
  let errored = false;

  function error(err) {
    if (!errored) {
      cb(err);
    }
    errored = true;
  } 

  function finder(path) {
    asyncOps++;
    fs.readdir(path, (err, files) => {
      if (err) {
        return error(err);
      }

      files.forEach(file => {
        const fpath = join(path, file);
        asyncOps++;
        fs.stat(fpath, (err, stats) => {
          if (err) {
            return error(err);
          }
          if (stats.isDirectory()) {
            finder(fpath);
          }
          if (stats.isFile() && nameRegex.test(file)) {
            results.push(fpath);
          }
          asyncOps--;
          if (asyncOps === 0) {
            cb(null, results);
          }
        });
      });
      asyncOps--;
      if (asyncOps === 0) {
        cb(null, results);
      }
    });
  }
  finder(startPath);
};


exports.findAsync = async (nameRegex, startPath) => {
  const results = [];

  async function finder(path) {
    const files = await readdirAsync(path);

    files.forEach(async file => {
      const fpath = join(path, file);
      const stats = await statAsync(fpath);

      if (stats.isDirectory()) {
        await finder(fpath);
      }
      if (stats.isFile() && nameRegex.test(file)) {
        results.push(fpath);
      }
    });
  }

  await finder(startPath);
  return results;
};