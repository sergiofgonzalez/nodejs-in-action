'use strict';

const util = require('util');
const debug = require('debug')('sap-microservice:routes-index');

util.inspect.defaultOptions.depth = null;
util.inspect.defaultOptions.breakLength = Infinity;

exports.notFound = (req, res) => {
  res.status(404)
    .format({
      html: () => res.send(`<!doctype html><html lang="en"><head><title>404 Not Found</title></head><body>404 Not Found &mdash; The requested page does not exist</body></html>`),
      json: () => res.send({ message: 'Resource not found' }),
      text: () => res.send('Resource not found\n'),
      default: () => res.status.send(`Not Acceptable`)
    });
};

exports.error = (err, req, res, next) => {
  let msg;
  debug(`Error found: ${ util.inspect(err) }`);
  switch (err.type) {
    case 'database':
      msg = `Server Unavailable`;
      res.statusCode = 503;
      break;
    case 'authorization':
      msg = `Unauthorized`;
      res.statusCode = 401;
      break;
    default:
      msg = `Internal Server Error`;
      res.statusCode = 500;      
  }

  res.format({
    html: () => res.send(`<!doctype html><html lang="en"><head><title>${ res.statusCode} ${ msg }</title></head><body>${ res.statusCode} &mdash; ${ msg }</body></html>`),
    json: () => res.send({ error: msg }),
    text: () => res.send(`${ msg }\n`),
    default: () => res.status.send(`Not Acceptable`)
  });

  next(new Error(msg));
};