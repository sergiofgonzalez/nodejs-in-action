'use strict';

const fs = require('fs');
const debug = require('debug')('read:read');
const util = require('util');
util.inspect.defaultOptions.depth = null;
util.inspect.defaultOptions.breakLength = Infinity;

function read(filename) {
  debug(`About to read file (materialized): ${ filename} `);
  return new Promise((resolve, reject) => {    
    fs.readFile(filename, 'utf8', (err, textData) => {
      if (err) {
        debug(`ERROR: could not read file ${ filename }: ${ util.inspect(err) }`);
        return reject(err);
      }
      resolve(textData);
    });
  });
}

module.exports = read;