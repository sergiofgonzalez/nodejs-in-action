import { createLogger } from './lib/logger.js';
import { greeter } from './lib/greeter.js';

/* creating a Pino child logger for the main.js module */
const logger = createLogger('main');

/* logging a simple message */
logger.info(`Hello, world!`);

/* logging a message and some additional object(s) */
const name = 'Jason Isaacs';
logger.debug({ name }, `Hello to ${ name }`);

/* logging errors */
const err = new Error('Fabricated error');
logger.error({ err }, `an error has occurred: ${ err.message }`);
logger.error(err);

/* default level is INFO */
logger.debug('Thou shalt not show');

/* but you can use fine-grained controls per child logger (greeter configured with debug) */
greeter('Idris');