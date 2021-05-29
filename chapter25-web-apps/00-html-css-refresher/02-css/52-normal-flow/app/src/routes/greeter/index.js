import { getGreeting } from '../../services/greeter.js';
import Joi from 'joi';
import createError from 'http-errors';
import createPinoLogger from 'pino';

const logger = createPinoLogger({ name: 'routes:greeter', level: process.env.LOGGER_LEVEL ?? 'info' });

export function greeter(req, res, next) {
  const name = req.query.name;

  try {
    validateParameter(name);
  } catch (err) {
    logger.error({ err }, `Failed to validate query parameter "name"=${ name }: ${ err.message }`);
    return next(createError.BadRequest(`"name" query parameter is required`));
  }

  try {
    const greeting = getGreeting(name);
    res.format({
      'text/plain': () => res.send(greeting)        /* force sending text/plain instead of text/html */
    });
  } catch (err) {
    logger.error({ err }, `Could not process greeting for name=${ name } query parameter: ${ err.message }`);
    next(createError.InternalServerError(err.message));
  }
}


function validateParameter(name) {
  logger.debug({ param: name }, `Validating request query parameter name: ${ name }`);
  const schema = Joi.object().keys({
    name: Joi.string().max(255).required()
  }).required();
  const { error } = schema.validate({ name });
  if (error) {
    logger.error({ error }, `Validation failed for 'name' request parameter: ${ error }`);
    throw error;
  }
}
