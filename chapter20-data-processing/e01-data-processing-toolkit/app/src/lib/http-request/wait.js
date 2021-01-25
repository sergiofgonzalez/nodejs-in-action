'use strict';

const debug = require('debug')('http:wait');


module.exports = function wait(millis) {
  return new Promise(resolve => {
    debug(`waiting for ${ millis } ms`);
    setTimeout(() => {
      debug(`waiting for ${ millis } ms: done`);
      resolve();
    }, millis);
  });
};