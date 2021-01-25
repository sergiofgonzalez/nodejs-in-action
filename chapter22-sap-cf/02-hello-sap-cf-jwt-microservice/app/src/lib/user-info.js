'use strict';

const debug = require('debug')('lib:userinfo');
const config = require('../lib/config');
const util = require('util');
const xsenv = require('@sap/xsenv');
const xssec = require('@sap/xssec');

util.inspect.defaultOptions.depth = null;
util.inspect.defaultOptions.breakLength = Infinity;

async function getUserInfo(req) {
  return new Promise((resolve, reject) => {

    if (!req || !req.header('authorization') || !req.header('authorization') || !req.header('authorization').substring('Bearer '.length))  {
      return resolve();
    } 
    const jwt = req.header('authorization').substring('Bearer '.length);
     
    debug('About to query user info on the platform');
    xssec.createSecurityContext(jwt, xsenv.getServices({ uaa: config('xsuaa-instance') }).uaa, (err, securityContext) => {
      if (err) {
        const msg = `Could not obtain security context: ${ err }`;
        debug(`ERROR: ${ msg }`);
        return reject(new Error(msg));
      }
      debug(`Successfully obtained security context: ${ util.inspect(securityContext) }`);
      const userInfo = { logonName: securityContext.getLogonName(), givenName: securityContext.getGivenName(), familyName: securityContext.getFamilyName(), email: securityContext.getEmail() };
      
      debug(`userInfo =  ${ util.inspect(userInfo) }`);
      return resolve(userInfo);
    });
  });
}

module.exports = getUserInfo;