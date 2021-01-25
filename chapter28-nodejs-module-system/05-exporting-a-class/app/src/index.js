'use strict';

const Logger = require('./logger');

// creating an instance and using its methods
const dbLogger = new Logger('DB');
dbLogger.info(`This is an informational message`);
dbLogger.log(`logging some info`);

// additional instances can be created
const accessLogger = new Logger('ACCESS');
accessLogger.verbose(`This is an informational message`);
accessLogger.log(`logging some info`);

// the original class can be extended
class MyLogger extends Logger {

  fatal(message) {
    console.log(`FATAL: ${ this.name } has failed with message: ${ message }`);
  }
}

const appLogger = new MyLogger('APP');
appLogger.fatal(`unexpected condition`);
appLogger.log(`logging some info`);
