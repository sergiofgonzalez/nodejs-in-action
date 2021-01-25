'use strict';

const debug = require('debug')('lib:authorizer');
const createError = require('http-errors');
const config = require('./config');

const mustAuthorize = config(`NODE_ENV`) === 'production' || config('VCAP_SERVICES');

function checkScope(requiredScope) {
  return (req, res, next) => {
    if (!req.authInfo || !req.authInfo.checkScope) {
      debug(`The request did not include support to check authorization scope`);
      return next(createError.InternalServerError('Request does not feature the necessary authorization support'));
    }
    const scopeToCheck = `$XSAPPNAME.${ requiredScope }`;
    debug(`Checking for authorization to ${ scopeToCheck }`);
    const isAuthorized = req.authInfo.checkScope(scopeToCheck);
    if (isAuthorized) {
      debug(`User featured ${ requiredScope }`);
      next();
    } else {
      debug(`User did not feature ${ requiredScope }`);
      next(createError.Forbidden(`User did not feature the required scope: ${ requiredScope }`));
    }
  };
}

function getAuthorizationMiddleware(...args) {
  if (mustAuthorize) {
    debug(`Passport JWT strategy configured`);
    return checkScope(args);
  } else {
    debug(`Skipped authorizer`);
    return (req, res, next) => next();
  }
}

module.exports = {
  checkScope: getAuthorizationMiddleware
};