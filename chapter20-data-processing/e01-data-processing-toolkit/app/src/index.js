'use strict';


const importToolkit = require('./lib/import-toolkit');
const util = require('util');
const path = require('path');
const debug = require('debug')('index');

util.inspect.defaultOptions.depth = null;
util.inspect.defaultOptions.breakLength = Infinity;

(async () => {
  try {
    importFromJsonFile('earthquakes.json');
    importFromCsvFile('earthquakes.csv');
    importFromCsvUrl('https://earthquake.usgs.gov/fdsnws/event/1/query.csv?starttime=2017-01-01&endtime=2017-03-02');
    importFromJsonUrl('https://earthquake.usgs.gov/fdsnws/event/1/query.geojson?starttime=2017-01-01&endtime=2017-03-02');
  } catch (err) {
    debug(`ERROR: ${ util.inpect(err) }`);
  }
})();


async function importFromJsonFile(jsonDataFile) {
  const earthquakes = await importToolkit.fromJsonFile(path.join(__dirname, 'files', jsonDataFile));
  debug(`FILE/JSON: Number of objects loaded: ${ earthquakes.length }`);
  debug(`FILE/JSON: First object: ${ util.inspect( earthquakes[0] ) }`);
  debug(`FILE/JSON: Last object: ${ util.inspect( earthquakes[earthquakes.length - 1] ) }`);
  return earthquakes;
}

async function importFromCsvFile(csvDataFile) {
  const earthquakes = await importToolkit.fromCsvFile(path.join(__dirname, 'files', csvDataFile));
  debug(`FILE/CSV: Number of objects loaded: ${ earthquakes.length }`);
  debug(`FILE/CSV: First object: ${ util.inspect( earthquakes[0] ) }`);
  debug(`FILE/CSV: Last object: ${ util.inspect( earthquakes[earthquakes.length - 1] ) }`);
  return earthquakes;
}

async function importFromCsvUrl(csvDataUrl) {
  const earthquakes = await importToolkit.fromCsvUrl(csvDataUrl);
  debug(`HTTP/CSV: Number of objects loaded: ${ earthquakes.length }`);
  debug(`HTTP/CSV: First object: ${ util.inspect( earthquakes[0] ) }`);
  debug(`HTTP/CSV: Last object: ${ util.inspect( earthquakes[earthquakes.length - 1] ) }`);
  return earthquakes;
}

async function importFromJsonUrl(jsonDataUrl) {
  const earthquakes = await importToolkit.fromJsonUrl(jsonDataUrl);
  debug(`JSON: Number of objects loaded: ${ earthquakes.features.length }`);
  debug(`JSON: First object: ${ util.inspect( earthquakes.features[0] ) }`);
  debug(`JSON: Last object: ${ util.inspect( earthquakes.features[earthquakes.features.length - 1] ) }`);
  return earthquakes;
}