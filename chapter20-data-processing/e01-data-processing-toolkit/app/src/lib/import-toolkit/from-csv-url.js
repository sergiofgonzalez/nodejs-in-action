'use strict';

const httpRequest = require('../http-request');
const papa = require('papaparse');
const debug = require('debug')('import-toolkit:from-csv-url');

async function fromCsvUrl(url) {
  debug(`About to import CSV data from URL: ${ url }`);
  const csvText =  await httpRequest.get(url);
  const result = papa.parse(csvText, { header: true, dynamicTyping: true });
  debug(`Completed CSV import for url: ${ url }`);
  return result.data;
}

module.exports = fromCsvUrl;