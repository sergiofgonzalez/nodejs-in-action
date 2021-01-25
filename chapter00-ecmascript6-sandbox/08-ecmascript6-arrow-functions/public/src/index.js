"use strict";

const fs = require("fs");

/* when using a single statement, there is no need to use return */
var doubledArray = [1, 2, 3].map(value => value * 2);
console.log(`doubledArray=${doubledArray}`);

var filteredArray = [1, 2, 3, 4, 5].filter(value => (value % 2) === 0);
console.log(`filteredArray=${filteredArray}`);

var total = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10].reduce((acc, value) => acc + value, 0);
console.log(`total=${total}`);

/* when using complex statements you must return the value explicitly */
var oddNumbers = [1, 2, 3, 4, 5].filter(value => {
  console.log(`value=${value}`);
  if ((value % 2) !== 0) {
    return value;
  }
});
console.log(`oddNumbers=${oddNumbers}`);

/* you can use it with all types of callbacks */
fs.readFile(`${__dirname}/index.js`, (err, fileContents) => {
  if (err) {
    throw new Error(err);
  }
  console.log(`File length=${fileContents.length}`);
});
