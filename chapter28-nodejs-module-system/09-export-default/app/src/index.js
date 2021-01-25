'use strict';

import MyLogger from './logger.js';

/* internally, a default export is equivalent to a named export with `default` as the name */
import * as loggerModule from './logger.js';

const myLogger = new MyLogger('DEFAULT');
myLogger.log('Hello!');

console.log(loggerModule);