const config = require('../lib/config');
const debug = require('debug')('client:models-client');

class Client {
  constructor({ 'client_name': clientName = undefined, 'client_id': clientId, 'client_secret': clientSecret, 'redirect_uris': redirectUris, 'logo_uri': clientLogoUri = undefined, scope}) {
    this._clientName = clientName;
    this._clientId = clientId;
    this._clientSecret = clientSecret;
    this._redirectUris = redirectUris;
    this._scope = scope;
    this._logoUri = clientLogoUri;
  }

  get 'client_name'() {
    return this._clientName;
  }

  get 'client_id'() {
    return this._clientId;
  }

  get 'client_secret'() {
    return this._clientSecret;
  }

  get 'redirect_uris'() {
    return this._redirectUris.slice(0);
  }

  get scope() {
    return this._scope;
  }

  get 'logo_uri'() {
    return this._logoUri;
  }


  static getClients() {
    return clients;
  }

  static findByClientId(clientId) {
    return this.getClients().find(client => client['client_id'] == clientId);
  }
}


const clients = [];
for (const clientFromConfig of config('oauth:clients')) {
  clients.push(new Client(clientFromConfig));
}

debug(`${ clients.length } client(s) are registered in this Authorization Server`);

module.exports = Client;
