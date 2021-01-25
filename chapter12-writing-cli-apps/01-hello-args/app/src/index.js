"use strict";

const args = process.argv;

args.forEach((arg, i) => {
  console.log(`[${ i }]: ${ arg }`);
});