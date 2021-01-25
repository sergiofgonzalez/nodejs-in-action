'use strict';

const httpRequest = require('../http-request');
const debug = require('debug')('import-toolkit:from-json-url');

async function fromJsonUrl(url) {
  debug(`About to import from JSON data from url: ${ url }`);
  const jsonContent =  await httpRequest.get(url);
  const json = JSON.parse(jsonContent);
  debug(`Completed JSON import for url: ${ url }`);
  return json;
}

module.exports = fromJsonUrl;