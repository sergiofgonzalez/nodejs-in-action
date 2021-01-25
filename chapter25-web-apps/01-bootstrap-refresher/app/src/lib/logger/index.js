const debug = require('debug')('lib:logger');
const { createLogger, format, transports } = require('winston');
const { combine, timestamp, prettyPrint, colorize, printf, label, splat } = format;

const defaultFormat = printf(info => `${ info.timestamp } |-${ info.level } [${ info.label }]: ${ info.message }`);


function logger(module = '') {
  debug(`creating a logger for '${ module }'`);

  const loggerOptionsFormat = combine(timestamp(), prettyPrint(), colorize(), splat(), label({ label: module }), defaultFormat);

  return createLogger({
    exitOnError: false, // do not exit after uncaught exception
    level: process.env['logger:level'] || 'info',
    format: loggerOptionsFormat,
    transports: [new transports.Console()]
  });
}


module.exports = logger;
