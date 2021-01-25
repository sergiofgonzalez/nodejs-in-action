'use strict';

const util = require('util');
const debug = require('debug')('server:routes:index');
const generateReport = require('../lib/generate-report');
const data = require('../lib/reef-data');

util.inspect.defaultOptions.depth = null;
util.inspect.defaultOptions.breakLength = Infinity;


exports.report = (req, res) => {
  debug(`request received: ${ req.url }`);
  const report = generateReport(data);
  res.json(report);
};

exports.notFound = (req, res) => {
  res.status(404)
    .format({
      html: () => {
        res.render('404');
      },
      json: () => {
        res.send({ message: 'Resource not found' });
      },
      text: () => {
        res.send('Resource not found\n');
      }
    });
};

exports.error = (err, req, res, next) => {
  let msg;
  debug(`Error found: ${ util.inspect(err) }`);
  switch (err.type) {
    case 'database':
      msg = 'Server Unavailable';
      res.statusCode = 503;
      break;
    case 'authorization':
      msg = 'Unauthorized';
      res.statusCode = 401;
      break;
    default:
      msg = 'Internal Server Error';
      res.statusCode = 500;
  }

  res.format({
    html: () => {
      res.render('5xx', { msg: msg, status: res.statusCode });
    },
    json: () => {
      res.send({ error: msg });
    },
    text: () => {
      res.send(`${ msg }\n`);
    },
    default: () => {
      res.status(406).send('Not Acceptable');
    }
  });
  next(new Error(msg));
};
