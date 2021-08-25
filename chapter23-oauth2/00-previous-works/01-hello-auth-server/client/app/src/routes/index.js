'use strict';

const AuthorizationServerServices = require('../services/auth-server-services');
const randomstring = require('randomstring');
const debug = require('debug')('client:index-routes');
const buildUrl = require('../lib/build-url');
const createError = require('http-errors');
const encodeClientCredentials = require('../lib/encode-client-credentials');
const http = require('http');
const util = require('util');
const querystring = require('querystring');
const config = require('../lib/config');

util.inspect.defaultOptions.depth = null;
util.inspect.defaultOptions.breakLength = Infinity;

let state = null;
let accessToken = null;
let scope = null;

exports.home = (req, res) => {
  if (!accessToken) {
    res.locals.messages.push({ type: 'info', string: `No access_token available yet` });  
  }
  res.render('home', { title: `OAuth2 Client`, 'access_token': accessToken, scope: scope });
};


exports.authorize = (req, res) => {
  state = randomstring.generate();

  const authorizeUrl = buildUrl(
    AuthorizationServerServices.getAuthorizationServer().authorizationEndpoint,
    {
      'response_type': 'code',
      'client_id': AuthorizationServerServices.getClients()[0]['client_id'],
      'redirect_uri': AuthorizationServerServices.getClients()[0]['redirect_uris'][0],
      state
    }
  );

  debug(`Redirect: ${ authorizeUrl }`);
  res.redirect(authorizeUrl);
};


exports.callback = (req, res, next) => {
  if (req.query.error) {
    return res.render('error', {msg: req.query.error, status: res.statusCode });
  }

  if (req.query.state !== state) {
    debug(`ERROR: state does not match: expected ${ state } but got ${ req.query.state }`);
    return next(createError.BadRequest(`state does not match: expected ${ state } but got ${ req.query.state }`));
  }

  const code = req.query.code;

  const postData = querystring.stringify({
    'grant_type': 'authorization_code',
    code,
    redirect_uri: AuthorizationServerServices.getClients()[0]['redirect_uris'][0]    
  });

  const clientId = AuthorizationServerServices.getClients()[0]['client_id'];
  const clientSecret = AuthorizationServerServices.getClients()[0]['client_secret'];
  
  const tokenEndpointUrl = new URL(AuthorizationServerServices.getAuthorizationServer().tokenEndpoint);
  const options = {
    hostname: tokenEndpointUrl.hostname,
    port: tokenEndpointUrl.port,
    path: tokenEndpointUrl.pathname,
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      'Content-Length': Buffer.byteLength(postData),
      'Authorization': `Basic ${ encodeClientCredentials(clientId, clientSecret) }`      
    }
  };

  const tokReq = http.request(options, tokRes => {
    let resData = '';
    debug(`status: ${ tokRes.statusCode }`);
    tokRes.setEncoding('utf8');
    tokRes.on('data', chunk => {
      debug(`body: ${ chunk }`);
      resData += chunk;
    });
    tokRes.on('end', () => {
      debug(`no more data in the response`);      
      if (res.statusCode >= 200 && res.statusCode < 300) {
        const body = JSON.parse(resData);
        accessToken = body['access_token'];
        debug(`Got access_token: ${ accessToken }`);
        res.locals.messages.push({ type: 'success', string: `Successfully obtained access_token from Authorization Server` });  
        if (!scope || scope.length === 0) {
          res.locals.messages.push({ type: 'info', string: `No scope was requested` });  
        }        
        return res.render('home', { title: `OAuth2 Client`, 'access_token': accessToken, scope });
      } else {        
        res.render('error', { msg: `Unable to fetch access token`, status: res.statusCode });
      }
    });
  });

  tokReq.on('error', err => {
    debug(`Error: problem found in the request: ${ util.inspect(err) }`);
  });

  tokReq.write(postData);
  tokReq.end();
};

exports.fetchResource = (req, res) => {
  if (!accessToken) {
    res.locals.messages.push({ type: 'error', string: `Missing Access Token` });
    return res.render('home', { title: `OAuth2 Client`, 'access_token': accessToken, scope });
  }

  debug(`Making request to Protected Resource with access token ${ accessToken }`);
  const protectedResourceUrl = new URL(config('oauth:protected-resource'));
  const options = {
    hostname: protectedResourceUrl.hostname,
    port: protectedResourceUrl.port,
    path: protectedResourceUrl.pathname,
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${ accessToken }`      
    }
  };

  const resourceReq = http.request(options, resourceRes => {
    let resData = '';
    debug(`status: ${ resourceRes.statusCode }`);
    resourceRes.setEncoding('utf8');
    resourceRes.on('data', chunk => {
      debug(`body: ${ chunk }`);
      resData += chunk;
    });
    resourceRes.on('end', () => {
      debug(`no more data in the response`);      
      if (resourceRes.statusCode >= 200 && resourceRes.statusCode < 300) {
        const body = JSON.parse(resData);
        res.locals.messages.push({ type: 'success', string: `Successfully fetched Protected Resource` });
        return res.render('data', { title: `OAuth2 Client`, resource: body });
      } else {        
        res.render('error', { msg: `Unable to fetch Protected Resource`, status: res.statusCode });
      }
    });
  });

  resourceReq.on('error', err => {
    debug(`Error: problem found in the request: ${ util.inspect(err) }`);
    res.locals.messages.push({ type: 'error', string: `Unable to fetch Protected Resource: ${ err.message }` });
    return res.render('home', { title: `OAuth2 Client`, 'access_token': accessToken, scope });
  });

  resourceReq.end();
};