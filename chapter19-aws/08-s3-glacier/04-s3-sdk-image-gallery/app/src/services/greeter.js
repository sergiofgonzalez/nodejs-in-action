import { buildLogger } from '../lib/logger.js';
import Joi from 'joi';

const logger = buildLogger('services:greeter');

export function getGreeting(name) {
  logger.debug(`Processing greeting for ${ name }`);

  validateArgument(name);
  return `Hello, ${ name }! I'm glad to meet you!`;
}


function validateArgument(name) {
  const schema = Joi.object().keys({
    name: Joi.string().max(255).required()
  }).required();
  const { error } = schema.validate({ name });
  if (error) {
    logger.error(`Validation failed for "name" service argument: ${ error }`);
    throw error;
  }
}
