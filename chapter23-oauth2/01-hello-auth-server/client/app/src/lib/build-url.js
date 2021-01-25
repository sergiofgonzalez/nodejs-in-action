const url = require('url');
const __ = require('underscore');

module.exports = (base, options, hash) => {
  const newUrl = url.parse(base, true);
  if (!newUrl.query) {
    newUrl.query = {};
  }

  __.each(options, (value, key) => {
    newUrl.query[key] = value;
  });

  if (hash) {
    newUrl.hash = hash;
  }

  return url.format(newUrl);
};