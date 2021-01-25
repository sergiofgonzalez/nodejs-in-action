const config = require('../lib/config');

class AuthorizationServer {
  constructor({ authorizationEndpoint, tokenEndpoint }) {
    this._authorizationEndpoint = authorizationEndpoint;
    this._tokenEndpoint = tokenEndpoint;
  }

  get authorizationEndpoint() {
    return this._authorizationEndpoint;
  }

  get tokenEndpoint() {
    return this._tokenEndpoint;
  }

  static getAuthorizationServer() {
    return authServer;
  }
}


const authServer = new AuthorizationServer({ 
  authorizationEndpoint: config('oauth:auth-server:authorization-endpoint'),
  tokenEndpoint: config('oauth:auth-server:token-endpoint')
});

module.exports = AuthorizationServer;

