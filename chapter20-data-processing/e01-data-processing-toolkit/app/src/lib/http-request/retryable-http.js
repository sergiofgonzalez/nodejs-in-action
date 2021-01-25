'use strict';

const https = require('https');
const http = require('http');
const { URL } = require('url');
const debug = require('debug')('http:retryable-http');
const util = require('util');
const wait = require('./wait');
util.inspect.defaultOptions.depth = null;
util.inspect.defaultOptions.breakLength = Infinity;

async function get(url, maxRetryCount = 5, initialRetryWaitMillis = 500) {
  return new Promise((resolve, reject) => {
    debug(`about to submit HTTP get request to ${ url }`);
    let requestData = '';
    let retryCount = 0;
    let currentRetryWaitMillis = initialRetryWaitMillis;

    const requestedUrl = new URL(url);

    const requestOptions = {
      protocol: requestedUrl.protocol,
      method: 'GET',
      hostname: requestedUrl.hostname,
      port: requestedUrl.port,
      path: `${ requestedUrl.pathname }${ requestedUrl.search }`
    };

    const _http = requestOptions.protocol === 'http:' ? http : https;

    const requestLogic = () => {
      const req = _http.request(requestOptions, res => {
        let chunkCount = 0;
        debug(`${ requestOptions.method } ${ url } : ${ res.statusCode }`);
        res.setEncoding('utf8');

        res.on('data', chunk => {
          debug(`${ requestOptions.method } ${ url } : data chunk #${ chunkCount }: ${ chunk.length } byte(s) received`); 
          requestData += chunk;  
        });

        res.on('end', () => {
          debug(`${ requestOptions.method } ${ url } : completed: ${ requestData.length } bytes received`);
          if (res.statusCode < 200 || res.statusCode >= 300) {
            const errMessage = `ERROR: unexpected HTTP status code: ${ res.statusCode } for ${ requestOptions.method } ${ url }`;
            debug(errMessage);
            reject(errMessage);
          } else {
            return resolve(requestData);
          }
        });
      });

      debug(`About to submit request: ${ requestOptions.method } ${ url }`);
      req.end();

      req.on('error', async err => {
        if (retryCount++ <= maxRetryCount) {
          debug(`WARNING: ${ requestOptions.method } ${ url }: failed: attempt ${ retryCount }: will be retried after ${ currentRetryWaitMillis } ms: ${ err.message }`);
          await wait(currentRetryWaitMillis);
          currentRetryWaitMillis *= 3;
          requestLogic();
        } else {
          debug(`ERROR: ${ requestOptions.method } ${ url }: failed after ${ retryCount } attempts: ${ err.message }`);
          reject(err);
        }
      });
    };
    requestLogic();
  });
}


module.exports = {
  get
};