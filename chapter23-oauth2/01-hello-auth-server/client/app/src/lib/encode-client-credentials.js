const querystring = require('querystring');

module.exports = (clientId, clientSecret) => {
  return Buffer.from(`${ querystring.escape(clientId) }:${ querystring.escape(clientSecret) }`).toString('base64');
};