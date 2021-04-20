import { createLogger } from './logger.js';

const logger = createLogger('greeter', 'debug');

export function greeter(name) {
  logger.debug({ name }, `About to greet ${ name }`);
  console.log(`Hello to ${ name ?? 'Jason Isaacs'}!!!`);
}