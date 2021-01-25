// import data from './data.json';  // ERROR: unknown file extension: .json
// const logger = require('./logger'); // ERROR: require is not defined
// import logger from './logger.js'; // ERROR: ./logger.js does not provide an export named default
import loggerESM from './logger.cjs'; // this works but requires the module to be renamed as cjs

/* this works but requires the module to be renamed as .cjs */
import { createRequire } from 'module';
const require = createRequire(import.meta.url);
const logger = require('./logger.cjs');

const data = require('./data.json');
console.log(data);

logger('Hello to Jason');
loggerESM('Hello to Idris');

