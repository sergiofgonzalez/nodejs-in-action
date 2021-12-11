import Joi from 'joi';
import createPinoLogger from 'pino';

const logger = createPinoLogger({name: 'services:greeter', level: process.env.LOGGER_LEVEL ?? 'info' });

export function getGreeting(name) {
  logger.debug({ param: name }, `Processing greeting for ${ name }`);

  validateArgument(name);
  return `Hello, ${ name }! I'm glad to meet you!`;
}


function validateArgument(name) {
  const schema = Joi.object().keys({
    name: Joi.string().max(255).required()
  }).required();
  const { error } = schema.validate({ name });
  if (error) {
    logger.error({ error }, `Validation failed for "name" service argument: ${ error }`);
    throw error;
  }
}
