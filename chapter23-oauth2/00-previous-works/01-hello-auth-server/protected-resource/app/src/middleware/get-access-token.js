const debug = require('debug')('protected-resource:get-access-token');
const TokenStore = require('../lib/token-store');

module.exports = async (req, res, next) => {
  const authHeader = req.headers['authorization'];
  let incomingToken = null;

  if (authHeader && authHeader.toLowerCase().indexOf('bearer') === 0) {
    incomingToken = authHeader.slice('bearer '.length);
  } else if (req.body && req.body['access_token']) {
    incomingToken = req.body['access_token'];
  } else if (req.query && req.query['access_token']) {
    incomingToken = req.query['access_token'];
  }

  debug(`Incoming token: ${ incomingToken }`);
  const token = await TokenStore.findByAccessToken(incomingToken);
  if (token) {
    debug(`Found a matching token: ${ incomingToken }`);
    req['access_token'] = token;
  } else {
    debug(`No matching token was found in the tokens store for ${ incomingToken }`);
  }

  return next();
};