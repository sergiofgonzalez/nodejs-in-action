// import data from './data.json';  // ERROR: unknown file extension: .json
// const logger = require('./logger'); // ERROR: require is not defined
import loggerESM, { verbose as verboseESM } from './logger.js'; // this works but requires main module extension to be .mjs and no type: module


/* this works but requires the module to be renamed as .cjs */
import { createRequire } from 'module';
const require = createRequire(import.meta.url);
const logger = require('./logger');
const { verbose } = require('./logger'); 

loggerESM('Hello to Idris');
logger('Hello to Jason');
verbose('Hello to *chuckles* Branagh');
verboseESM('Hello to Toby');