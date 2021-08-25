'use strict';

const AuthorizationServerServices = require('../services/auth-server-services');
const createError = require('http-errors');
const __ = require('underscore');
__.string = require('underscore.string');
const url = require('url');
const randomstring = require('randomstring');
const querystring = require('querystring');
const debug = require('debug')('auth-server:index-routes');
const TokenStore = require('../lib/token-store');


exports.home = (req, res) => {
  const clients = AuthorizationServerServices.getClients();
  res.locals.messages.push({ type: 'success', string: `Successfully retrieved clients information` });
  const authServer = AuthorizationServerServices.getAuthorizationServer();
  res.locals.messages.push({ type: 'success', string: `Successfully retrieved authorization server information` });  
  res.render('home', { title: `Authorization Server`, clients, authServer });
};


exports.authorize = (req, res, next) => {
  /* check client_id found in the request */
  const clientId = req.query['client_id'];
  if (!clientId) {
    return next(createError.BadRequest(`The ${ req.path } endpoint requires a query parameter "client_id"`));    
  }

  /* check redirect_uri found in the request */
  const clientRedirectUri = req.query['redirect_uri'];
  if (!clientRedirectUri) {
    return next(createError.BadRequest(`The ${ req.path } endpoint requires a query parameter "redirect_uri"`));    
  }

  /* find the client_id/redirect_uri in the auth server data */
  const client = AuthorizationServerServices.getClientByClientId(clientId);
  if (!client) {
    return next(createError.BadRequest(`Unknown client: "${ clientId }" for ${ req.path }`));
  }

  if (!client['redirect_uris'].find(uri => uri === clientRedirectUri)) {
    return next(createError.BadRequest(`Mismatched redirect URI for ${ req.path }; expected one of "${ client.redirect_uris }" but got "${ clientRedirectUri }"`));
  }

  /* compute the difference between the requested and authorized scopes */
  const requestedScopes = req.query.scope ? req.query.scope.split(' ') : undefined;
  const authorizedScopes = client.scope ? client.scope.split(' ') : undefined;
  if (__.difference(requestedScopes, authorizedScopes).length > 0) {
    const urlParsed = url.parse(clientRedirectUri);
    urlParsed.query = urlParsed.query || {};
    urlParsed.query.error = 'invalid_scope';
    return res.redirect(url.format(urlParsed));
  }

  const reqId = randomstring.generate(8);
  AuthorizationServerServices.addNewAuthorizationRequest({ reqId, reqQuery: req.query });

  return res.render('approve', { title: 'Authorization Server: Approve', client, reqId, reqScope: requestedScopes });
};

exports.approve = (req, res, next)  => {
  const reqId = req.body.reqId;
  if (!reqId) {
    return next(createError.BadRequest(`The ${ req.path } endpoint requires a "reqId" in the body of the request`));        
  }

  const query = AuthorizationServerServices.getAuthorizationRequestById(reqId);
  if (!query) {
    return next(createError.BadRequest(`No matching authorization request was found for ${ reqId }`));    
  }

  AuthorizationServerServices.removeAuthorizationRequestById(reqId);

  if (req.body.approve) {
    if (query['response_type'] === 'code') {
      const code = randomstring.generate(8);
      const user = req.body.user;
      const scope = __.filter(__.keys(req.body), s => __.string.startsWith(s, 'scope_')).map(s => s.slice('scope_'.length));
      const client = AuthorizationServerServices.getClientByClientId(query['client_id']);
      const clientScope = client.scope ? client.scope.split(' ') : undefined;
      if (__.difference(scope, clientScope).length > 0) {
        const urlParsed = url.parse(query['redirect_uri']);
        urlParsed.query = urlParsed.query || {};
        urlParsed.query.error = 'invalid_scope';
        return res.redirect(url.format(urlParsed));
      }

      AuthorizationServerServices.addNewAuthorizationCode({code, authInfo: { authorizationEndpointRequest: query, scope, user }});
      const urlParsed = url.parse(query['redirect_uri']);
      urlParsed.query = urlParsed.query || {};
      urlParsed.query.code = code;
      urlParsed.query.state = query.state;

      const redirectUrl = url.format(urlParsed);
      debug(`Redirect: ${ redirectUrl }`);
      return res.redirect(redirectUrl);
    }

    const urlParsed = url.parse(query['redirect_uri']);
    urlParsed.query = urlParsed.query || {};
    urlParsed.query.error = 'unsupported_response_type';
    return res.redirect(url.format(urlParsed));
  }

  const urlParsed = url.parse(query['redirect_uri']);
  urlParsed.query = urlParsed.query || {};
  urlParsed.query.error = 'access_denied';
  return res.redirect(url.format(urlParsed));
};

exports.token = async (req, res) => {
  const authHeader = req.headers['authorization'];
  let clientId, clientSecret;
  if (authHeader) {
    const clientCredentials = Buffer.from(authHeader.slice('basic '.length), 'base64').toString().split(':');
    clientId = querystring.unescape(clientCredentials[0]);
    clientSecret = querystring.unescape(clientCredentials[1]);
  }

  if (req.body['client_id']) {
    if (clientId) {
      debug(`Error: client attempted to authenticate with multiple methods`);
      return res.status(401).json({ error: 'invalid_client' });
    }
    clientId = req.body['client_id'];
    clientSecret = req.body['client_secret'];
  }

  if (!clientId) {
    debug(`Error: expected a client_id in either Authorization HTTP header or body but none was found`);
    return res.status(401).json({ error: 'invalid_client '});
  }

  if (!clientSecret) {
    debug(`Error: expected a client_secret in either Authorization HTTP header or body but none was found`);
    return res.status(401).json({ error: 'invalid_client '});    
  }

  const client = AuthorizationServerServices.getClientByClientId(clientId);
  if (client['client_secret'] != clientSecret) {
    debug(`Error: Mismatched client_secret, expected ${ client['client_secret'] } but got ${ clientSecret }`);
    return res.status(401).json({ error: 'invalid_client '});    
  }

  if (req.body['grant_type'] !== 'authorization_code') {
    debug(`Error: Unknown grant type ${ req.body['grant_type'] }`);
    return res.status(400).json({ error: 'unsupported_grant_type' });
  }

  if (!req.body.code) {
    debug(`Error: no code found in the request`);
    return res.status(400).json({ error: 'invalid_grant '});
  }
  const code = AuthorizationServerServices.getAuthorizationCode(req.body.code);
  AuthorizationServerServices.removeAuthorizationCode(req.body.code);
  if (code.authorizationEndpointRequest['client_id'] !== clientId) {
    debug(`Error: Client mismatch, expected ${ code.authorizationEndpointRequest['client_id'] } but got ${ clientId }`);
    return res.status(400).json({ error: 'invalid_grant '});
  }
  let clientScopes;
  if (code.scope) {
    clientScopes = code.scope.join(' ');
  }

  const token = { 'access_token': randomstring.generate(), 'client_id': clientId, scope: clientScopes }; 
  await TokenStore.push(token);

  debug(`Issuing access token ${ token['access_token'] } with scope ${ token.scope }`);

  const tokenResponse = { 'access_token': token['access_token'], 'token_type': 'Bearer', scope: token.scope };
  res.status(200).json(tokenResponse);

  debug(`Successfully issued token for code ${ req.body.code }`);
};
