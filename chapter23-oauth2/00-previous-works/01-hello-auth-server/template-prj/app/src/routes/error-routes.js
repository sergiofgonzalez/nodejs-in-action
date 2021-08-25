'use strict';

const util = require('util');
const debug = require('debug')('auth-server:error-routes');

util.inspect.defaultOptions.depth = null;
util.inspect.defaultOptions.breakLength = Infinity;

exports.notFound = (req, res) => {
  res.status(404)
    .format({
      html: () => res.render('404'),
      json: () => res.send({ message: 'Resource not found' }),
      xml: () => res.write(`<error>\n<message>Resource not found</message>\n<error>\n`),
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
    html: () => res.render('5xx', { msg, status: res.statusCode }),
    json: () => res.send({ error: msg, status: res.statusCode }),
    text: () => res.send(`${ msg }\n`),
    default: () => res.status(406).send(`Not Acceptable`)
  });

  next(new Error(msg));
};