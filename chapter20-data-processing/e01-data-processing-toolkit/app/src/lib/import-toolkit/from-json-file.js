'use strict';

const file = require('../file');
const debug = require('debug')('import-toolkit:from-json-file');

async function fromJsonFile(filepath) {
  debug(`About to import from JSON file: ${ filepath }`);
  const jsonContent =  await file.read(filepath);
  const json = JSON.parse(jsonContent);
  debug(`Completed JSON import for file: ${ filepath }`);
  return json;
}

module.exports = fromJsonFile;