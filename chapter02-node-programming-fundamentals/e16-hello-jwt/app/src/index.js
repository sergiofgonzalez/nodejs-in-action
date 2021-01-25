'use strict';

const njwt = require('njwt');
const util = require('util');
const fs = require('fs');
const path = require('path');
const crypto = require('crypto');
const debug = require('debug')('jwt:index');

const readFileAsync = util.promisify(fs.readFile);

util.inspect.defaultOptions.depth = null;
util.inspect.defaultOptions.breakLength = Infinity;

/* using njwt */
async function buildJwtUsingModule() {
  const privateKey = await readFileAsync(path.join(__dirname, 'private-key.pem'), 'utf8');
  const privateKey2 = await readFileAsync(path.join(__dirname, 'private-key-wo-metadata.pem'), 'utf8');

  const claims = {
    iss: 'the-iss',
    sub: 'the-sub',
    aud: 'the-aud'
  };

  const jwt = njwt.create(claims, privateKey, 'RS256');
  const jwt2 = njwt.create(claims, privateKey2, 'RS256');
  jwt2.body = jwt.body;


  debug(`unencoded token header: ${ util.inspect(jwt.header) }`);
  debug(`unencoded token body: ${ util.inspect(jwt.body) }`);
  debug(`unencoded token signature: ${ util.inspect(jwt.signature) }`);
  const encodedJwt = jwt.compact();
  const encodedJwt2 = jwt2.compact();
  debug(`encoded token  : ${ encodedJwt }`);
  debug(`encoded token  : ${ encodedJwt2 }`);
  if (encodedJwt !== encodedJwt2) {
    throw new Error('Both tokens should be equal!');
  }
  return { jwt, encodedJwt };
}


function base64UrlEncode(str) {
  return Buffer
    .from(str)
    .toString('base64')
    .replace(/\+/g, '-')
    .replace(/\//g, '_')
    .replace(/=/g, '');
}

async function buildJwt(claims) {
  const privateKey = await readFileAsync(path.join(__dirname, 'private-key.pem'), 'utf8');

  const header = {
    typ: 'JWT',
    alg: 'RS256'
  };

  const jwtHeader = base64UrlEncode(JSON.stringify(header));
  debug(`unencoded token header: ${ util.inspect(header) }`);

  const payload = claims;
  const jwtPayload = base64UrlEncode(JSON.stringify(payload));

  
  const signature = crypto.createSign('RSA-SHA256').update(`${ jwtHeader }.${ jwtPayload }`).sign(privateKey);
  const jwtSignature = base64UrlEncode(signature);
  debug(jwtSignature);

  return `${ jwtHeader }.${ jwtPayload }.${ jwtSignature }`;
}

(async () => {
  /* Building a JWT using a Module */
  const njwtToken = await buildJwtUsingModule();
  debug(`jwt token using njwt: ${ njwtToken.encodedJwt }`);

  /* Building a JWT using vanilla Node.js */
  const jwtToken = await buildJwt({
    iss: njwtToken.jwt.body.iss,
    sub: njwtToken.jwt.body.sub,
    aud: njwtToken.jwt.body.aud,
    jti: njwtToken.jwt.body.jti,
    iat: njwtToken.jwt.body.iat,
    exp: njwtToken.jwt.body.exp
  });
  debug(`jwt token custom built: ${ jwtToken }`);

  if (njwtToken.encodedJwt !== jwtToken) {
    throw new Error('Both tokens should be equal!');
  }

})();