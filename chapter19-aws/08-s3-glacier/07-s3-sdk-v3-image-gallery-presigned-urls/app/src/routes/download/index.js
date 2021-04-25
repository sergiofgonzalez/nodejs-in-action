import Joi from 'joi';
import createError from 'http-errors';
import createPinoLogger from 'pino';
import { getPresignedUrl } from '../../services/s3-get-presigned-url.js';


const logger = createPinoLogger({ name: 'routes:download', level: process.env.LOGGER_LEVEL ?? 'info' });

export async function download(req, res, next) {
  logger.debug({ requestParams: req.params }, `About to process file request`);
  const fileKey = req.params.fileKey;

  try {
    validateParameter(fileKey);
  } catch (err) {
    logger.error({ err }, `Failed to validate request parameter fileKey=${ fileKey }: ${ err.message }`);
    return next(createError.BadRequest(`"fileKey" parameter is required`));
  }

  try {
    const presignedUrl = await getPresignedUrl({ filename: fileKey });
    logger.info({ fileKey, presignedUrl }, `Successfully generated presigned URL for ${ fileKey }`);
    res.json({ fileKey, presignedUrl });
  } catch (err) {
    logger.error({ err }, `Could not obtained presigned URL for ${ fileKey }: ${ err.message }`);
    return next(createError.InternalServerError(`Presigned URL creation failed`));
  }
}

function validateParameter(fileKey) {
  logger.debug({ fileKey }, `Validating request parameter fileKey: ${ fileKey }`);
  const schema = Joi.object().keys({
    fileKey: Joi.string().max(255).required()
  }).required();
  const { error } = schema.validate({ fileKey });
  if (error) {
    logger.error({ error }, `Validation failed for 'fileKey' request parameter: ${ error }`);
    throw error;
  }
}
