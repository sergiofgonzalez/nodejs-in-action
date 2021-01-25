const get = require('simple-get');

function fetch(cb) {
  get('https://api/users', cb);
}

module.exports = fetch;