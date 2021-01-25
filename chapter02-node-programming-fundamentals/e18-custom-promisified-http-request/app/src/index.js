'use strict';


const httpRequest = require('./lib/http-request');
const util = require('util');

util.inspect.defaultOptions.depth = null;
util.inspect.defaultOptions.breakLength = Infinity;

(async () => {
  try {
    const httpData = await httpRequest.get('HTTP://samples.openweathermap.org/data/2.5/weather?lat=35&lon=139&appid=b6907d289e10d714a6e88b30761fae22');    
    console.log(`Contents read: length=${ httpData.length } `);
    console.log(httpData);

    const httpsData = await httpRequest.get('https://earthquake.usgs.gov/fdsnws/event/1/query.csv?starttime=2017-01-01&endtime=2017-03-02');
    console.log(`Contents read: length=${ httpsData.length } `);
    console.log(httpsData);
  } catch (err) {
    console.error(`Could not retrieve contents using HTTP: ${ err }`);
  }
})();