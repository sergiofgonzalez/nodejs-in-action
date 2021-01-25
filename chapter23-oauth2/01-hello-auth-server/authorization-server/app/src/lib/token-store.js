const loki = require('lokijs');
const util = require('util');
const debug = require('debug')('auth-server:token-store');
const config = require('./config');

util.inspect.defaultOptions.depth = null;
util.inspect.defaultOptions.breakLength = Infinity;

const db = new loki(config('token-store:path') || 'tokens.db');
const isReadOnlyTokenStore = config('token-store:read-only') || false;

let tokens = null;

async function refreshDatabase() {
  return new Promise((resolve, reject) => {
    debug(`Refreshing database`);
    db.loadDatabase({}, err => {
      if (err) {
        debug(`Error: tokens store could not be loaded: ${ util.inspect(err) }`);
        return reject(err);
      }
    
      tokens = db.getCollection('tokens');
      if (tokens.count() === 0) {
        debug(`the token store was empty`);
        tokens = db.addCollection('tokens');
        resolve();
      } else {
        debug(`${ tokens.count() } token(s) found in the store`);
        if (isReadOnlyTokenStore) {
          return resolve();
        } else {
          debug(`Clearing previous contents of the tokens store`);
          tokens.clear();
          db.saveDatabase(err => {
            if (err) {
              debug(`Error: Could not reinitialize database on file: ${ util.inspect(err) }`);
              return reject(err);
            }
            return resolve();
          });
        }
      }
    });
  });
}

(async () => {
  await refreshDatabase();
})();



class TokenStore {

  static async findByAccessToken(accessToken) {
    if (isReadOnlyTokenStore) {
      await refreshDatabase();
    }
    debug(`searching for access_token: ${ accessToken }`);
    const token = tokens.findOne({ 'access_token': accessToken });
    if (token) {
      debug(`token was found: ${ util.inspect(token) }`);
    } else {
      debug(`No token with key: ${ accessToken } was found`);
    }
    return token;
  }

  static async push(token) {
    return new Promise((resolve, reject) => {
      if (isReadOnlyTokenStore) {
        debug(`Error: the tokens store was configured as read only`);
        reject(new Error(`TokenStore was configured as read only`));
      }
      debug(`Adding token ${ util.inspect(token) } to the store`);
      tokens.insert(token);
      db.saveDatabase(err => {
        if (err) {
          debug(`Error: tokens store could not be updated`);
          reject(err);
        } else {
          debug(`Successfully updated tokens store on file`);
          resolve();
        }
      });
    });
  }
}

module.exports = TokenStore;