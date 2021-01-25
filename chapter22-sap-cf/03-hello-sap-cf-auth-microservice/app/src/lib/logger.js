'use strict';

const config = require('./config');
const { createLogger, format, transports } = require('winston');
const { combine, timestamp, prettyPrint, colorize, printf, label } = format;

const defaultFormat = printf(info => `${ info.timestamp } [${ info.label }] ${ info.level }: ${ info.message }`);

function logger(module = '') {
  return createLogger({
    exitOnError: false,
    level: config('logger:level') || 'info',
    format: combine(timestamp(), prettyPrint(), colorize(), label({ label: module }), defaultFormat),
    transports: [new transports.Console()]
  });
}

module.exports = logger;