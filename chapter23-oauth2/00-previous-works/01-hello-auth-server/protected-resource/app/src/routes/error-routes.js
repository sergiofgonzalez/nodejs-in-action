'use strict';

const util = require('util');
const debug = require('debug')('protected-resource:error-routes');
const config = require('../lib/config');

util.inspect.defaultOptions.depth = null;
util.inspect.defaultOptions.breakLength = Infinity;

exports.notFound = (req, res) => {
  res.status(404)
    .format({
      html: () => {
        if (config('NODE_ENV') !== 'production') {
          res.locals.messages.push({ type: 'error', string: `The page "${ req.path }" cannot be found` });
        }
        res.render('404');
      },
      json: () => res.send({ message: 'Resource not found' }),
      xml: () => res.write(`<error>\n<message>Resource not found</message>\n<error>\n`),
      text: () => res.send('Resource not found\n'),
      default: () => res.status.send(`Not Acceptable`)
    });
};

exports.error = (err, req, res, next) => {
  let msg;
  debug(`Error found: ${ util.inspect(err) }`);
  if (config('NODE_ENV') !== 'production') {
    res.locals.messages.push({ type: 'error', string: err.message? err.message : util.inspect(err) });
  }  
  res.statusCode = err.statusCode || 500;
  if (res.statusCode !== 500) {
    msg = err.name || 'Internal Server Error';
  } else {
    msg = 'Internal Server Error';
    if (err.name) {
      res.locals.messages.unshift({ type: 'error', string: err.name });
    }
  }


  res.format({
    html: () => res.render('error', { msg, status: res.statusCode }),
    json: () => res.send({ error: msg, status: res.statusCode }),
    text: () => res.send(`${ msg }\n`),
    default: () => res.status(406).send(`Not Acceptable`)
  });

  next(new Error(msg));
};