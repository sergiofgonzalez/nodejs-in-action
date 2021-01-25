'use strict';


const read = require('./lib/read');
const util = require('util');
const path = require('path');

util.inspect.defaultOptions.depth = null;
util.inspect.defaultOptions.breakLength = Infinity;

(async () => {
  try {
    const fileContents = await read(path.join(__dirname, `/files/earthquakes.csv`));
    console.log(`Contents read: length=${ fileContents.length } `);
    console.log(fileContents);
  } catch (err) {
    console.error(`Could not retrieve contents from file: ${ err }`);
  }
})();