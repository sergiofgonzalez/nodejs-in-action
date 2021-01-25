'use strict';

const createError = require('http-errors');
const util = require('util');
const debug = require('debug')('lib:err-handling-routes');

util.inspect.defaultOptions.depth = null;
util.inspect.defaultOptions.breakLength = Infinity;

exports.notFound = (req, res, next) => {
  debug(`Resource Not found`);
  next(createError.NotFound('Resource Not found'));
};

exports.error = (err, req, res, next) => {
  debug(`Error found: ${ util.inspect(err) }`);
  res.statusCode = err.statusCode || 500;
  const errName = err.name || 'n/a';
  const msg = err.message || 'Internal Server Error';

  res.format({
    html: () => res.send(`<!doctype html><html lang="en"><head><title>${ res.statusCode} ${ errName }</title></head><body>${ res.statusCode} (${ errName }) &mdash; ${ msg }</body></html>`),
    json: () => res.send({ statusCode: res.statusCode, errorName: errName, error: msg }),
    text: () => res.send(`ERROR: code=${ res.statusCode } (${ errName }); ${ msg } }\n`),
    default: () => res.status.send(`Not Acceptable`)
  });
  
  next(new Error(msg));
};