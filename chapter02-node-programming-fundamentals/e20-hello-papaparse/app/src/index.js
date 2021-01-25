'use strict';


const importCsvFile = require('./lib/import-csv-file');
const util = require('util');
const path = require('path');

util.inspect.defaultOptions.depth = null;
util.inspect.defaultOptions.breakLength = Infinity;

(async () => {
  try {
    const earthquakes = await importCsvFile(path.join(__dirname, `/files/earthquakes.csv`));
    console.log(`Number of earthquakes read: length=${ earthquakes.length } `);
    console.log(earthquakes);
  } catch (err) {
    console.error(`Could not obtain earthquakes from file: ${ err }`);
  }
})();