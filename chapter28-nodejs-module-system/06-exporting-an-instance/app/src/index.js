'use strict';

const logger = require('./logger');

logger.log(`logging some info`);

logger.log(`another informational message`);

/* bending the rules */
const customLogger = new logger.constructor('CUSTOM');

/* the following does not work as expected */
customLogger.fatal =(message) => {
  console.log(`(${ this.count }) [${ this.name }] ${ message }`);
};

customLogger.log(`logging some info`);
customLogger.fatal(`never thought this could be done`);