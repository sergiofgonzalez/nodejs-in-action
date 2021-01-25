'use strict';

const file = require('./file');
const debug = require('debug')('import-json-file:import-json-file');

async function importJsonFile(filepath) {
  debug(`About to import JSON file: ${ filepath }`);
  const jsonContent =  await file.read(filepath);
  const json = JSON.parse(jsonContent);
  debug(`Completed JSON import for file: ${ filepath }`);
  return json;
}

module.exports = importJsonFile;