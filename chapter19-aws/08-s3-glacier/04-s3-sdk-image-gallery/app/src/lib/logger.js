import winston from 'winston';
import createDebug from 'debug';

const debug = createDebug('lib:logger');
const { createLogger, format, transports } = winston;

const { combine, timestamp, prettyPrint, colorize, printf, label, splat } = format;
const defaultFormat = printf(logEvt => `${ logEvt.timestamp } |-${ logEvt.level } [${ logEvt.label }]: ${ logEvt.message }`);

export function buildLogger(module = '') {
  debug(`Creating a logger for ${ module }`);

  const loggerOptionsFormat = combine(timestamp(), prettyPrint(), colorize(), splat(), label({ label: module }), defaultFormat);

  return createLogger({
    exitOnError: false, // do not exit after uncaught exception
    level: process.env['LOGGER_LEVEL'] ?? 'info',
    format: loggerOptionsFormat,
    transports: [new transports.Console()]
  });
}