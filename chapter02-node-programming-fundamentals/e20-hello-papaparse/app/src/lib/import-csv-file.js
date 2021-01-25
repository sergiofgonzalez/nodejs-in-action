'use strict';

const file = require('./file');
const papa = require('papaparse');
const debug = require('debug')('import-csv-file:import-csv-file');

async function importCsvFile(filepath) {
  debug(`About to import CSV file: ${ filepath }`);
  const csvText =  await file.read(filepath);
  const result = papa.parse(csvText, { header: true, dynamicTyping: true });
  debug(`Completed CSV import for file: ${ filepath }`);
  return result.data;
}

module.exports = importCsvFile;