'use strict';

const fromJsonFile = require('./from-json-file');
const fromCsvFile = require('./from-csv-file');
const fromJsonUrl = require('./from-json-url');
const fromCsvUrl = require('./from-csv-url');

module.exports = {
  fromJsonFile,
  fromCsvFile,
  fromJsonUrl,
  fromCsvUrl
};