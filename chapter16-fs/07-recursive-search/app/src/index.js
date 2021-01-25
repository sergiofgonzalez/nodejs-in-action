"use strict";

const { join } = require("path");
const finder = require("./lib/finder");

try {
  console.time("findSync");
  const results = finder.findSync(/file.*/, join(__dirname, "example-tree"));
  console.log(results);
} catch (err) {
  console.error(err.message);
} finally {
  console.timeEnd("findSync");
}

setTimeout(() => {
  console.time("find");
  finder.find(/file.*/, join(__dirname, "example-tree"), (err, results) => {
    if (err) {
      console.error(err.message);
    } else {
      console.log(results);
    }
    console.timeEnd("find");

  });
}, 4000);

setTimeout(async () => {
  try {
    console.time("findAsync");
    const results = await finder.findSync(/file.*/, join(__dirname, "example-tree"));
    console.log(results);
  } catch (err) {
    console.error(err.message);
  } finally {
    console.timeEnd("findAsync");
  }
}, 8000);