'use strict';

const config = require('./config');
const debug = require('debug')('lib:authenticate');
const passport = require('passport');
const JWTStrategy = require('@sap/xssec').JWTStrategy;
const xsenv = require('@sap/xsenv');


const mustAuthenticate = config(`NODE_ENV`) === 'production' || config('VCAP_SERVICES');
const xsuaaInstance = config('xsuaa-instance') || 'local';
debug(`Authentication middleware wired according to NODE_ENV =  ${ config(`NODE_ENV`) }; must authenticate = ${ mustAuthenticate }; xsuaa = ${ xsuaaInstance } `);

function initialize() {
  if (mustAuthenticate) {
    passport.use(new JWTStrategy(xsenv.getServices({ uaa: xsuaaInstance }).uaa));
    return passport.initialize();
  } else {
    return (req, res, next) => next();
  }
}

function getAuthenticationMiddleware() {
  if (mustAuthenticate) {
    debug(`Passport JWT strategy configured`);
    return passport.authenticate('JWT', { session: false });
  } else {
    debug(`Skipped Passport JWT strategy`);
    return (req, res, next) => next();
  }
}

module.exports = {
  initialize: initialize,
  secureEndpoint: getAuthenticationMiddleware
};