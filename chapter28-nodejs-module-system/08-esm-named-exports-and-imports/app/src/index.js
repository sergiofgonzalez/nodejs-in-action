'use strict';

/* namespace import: import all the entities from `logger.js` in the namespace `loggerModule` */
import * as loggerModule from './logger.js';

/* import single entity from `logger.js` */
import { log } from './logger.js';

/* import several entities from `logger.js` */
import { LEVELS, Logger } from './logger.js';

/* renaming an entity while importing from `logger.js` */
import { DEFAULT_LEVEL as CURRENT_LOG_LEVEL } from './logger.js';

console.log(loggerModule);

log('hello, esm!');

const logger = new Logger('DEFAULT');
logger.log(`default levels: ${ LEVELS }`);

console.log(`CURRENT_LOG_LEVEL=${ CURRENT_LOG_LEVEL }`);