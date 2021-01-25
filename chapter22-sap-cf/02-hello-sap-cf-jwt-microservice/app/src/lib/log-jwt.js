const debug = require('debug')('lib:log-jwt');
const config = require('./config');
const util = require('util');
const xsenv = require('@sap/xsenv');
const xssec = require('@sap/xssec');

util.inspect.defaultOptions.depth = null;
util.inspect.defaultOptions.breakLength = Infinity;

module.exports = function showJWT(req) {
  const authHeader = req.header('authorization');
  if(!authHeader) {
    debug(`No Authorization header in the request`);
    return;
  }

  const jwt = authHeader.substring('Bearer '.length);
  debug(`JWT=${ jwt }`);
  
  debug(`About to obtain Security Context through xssec module`);
  xssec.createSecurityContext(jwt, xsenv.getServices({ uaa: config('xsuaa-instance') }).uaa, (err, securityContext) => {
    if (err) {
      debug(`Could not obtain Security Context`);
      return;
    }
    
    const userInfo = { 
      logonName: securityContext.getLogonName(),
      givenName: securityContext.getGivenName(),
      familyName: securityContext.getFamilyName(),
      email: securityContext.getEmail()
    };
    debug(`Security Context successfully retrieved: ${ util.inspect(userInfo) }`);
    debug(`securityContext=${ util.inspect(securityContext) }`);
  });
  
  debug(`About to obtain Security Context through user found in the request`);
  if (req.user) {
    const myUser = req.user;
    const myUserAuth = req.authInfo;
    debug(`User from request: user=${ util.inspect(myUser) }; userAuth=${ util.inspect(myUserAuth) }`);
  }
  debug(`done!`);
};