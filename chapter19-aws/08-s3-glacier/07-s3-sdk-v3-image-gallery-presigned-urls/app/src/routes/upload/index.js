import createError from 'http-errors';
// import { uploadToS3 } from '../../services/s3-file-upload.js';
import { listS3Objects } from '../../services/s3-list-objects.js';
import { getPresignedUrl } from '../../services/s3-get-presigned-url.js';

// import util from 'util';
import Joi from 'joi';
import createPinoLogger from 'pino';

const logger = createPinoLogger({ name: 'routes:upload', level: process.env.LOGGER_LEVEL ?? 'info' });

// eslint-disable-next-line no-unused-vars
export async function upload(req, res, next) {
  logger.debug(`About to process file upload request`);

  const filename = req.body.filename;
  try {
    validateParameter(filename);
  } catch (err) {
    logger.error({ err }, `Failed to validate body parameter filename=${ filename }: ${ err.message }`);
    return next(createError.BadRequest(`"filename" body parameter is required`));
  }

  try {
    logger.debug({ filename }, `Generating presigned URL for uploading ${ filename }`);
    const presignedUrl = await getPresignedUrl({ filename, action: 'PUT' });
    logger.info({ filename, presignedUrl }, `Successfully generated presigned URL for uploading ${ filename }`);
    res.json({ filename, presignedUrl });
  } catch (err) {
    logger.error({ err }, `Could not obtained presigned URL for uploading ${ filename }: ${ err.message }`);
    return next(createError.InternalServerError(`Presigned URL creation for upload failed`));
  }
}

export async function listUploadedfiles(req, res, next) {

  try {
    const uploadedFiles = await listS3Objects();
    return res.json(uploadedFiles);
  } catch (err) {
    logger.error({ err }, `Could not list files uploaded to S3: ${ err.message }`);
    return next(createError.InternalServerError('Could not list files uploaded to S3'));
  }
}

/*
async function tryDeleteTruncatedFile(filename) {
  try {
    await deleteFromS3(filename);
  } catch (err) {
    // report error, but swallow exception
    logger.error({ filename }, `Truncated uploaded file ${ filename } could not be deleted: ${ err.message }`);
  }
}
*/

function validateParameter(filename) {
  logger.debug({ filename }, `Validating request parameter filename: ${ filename }`);
  const schema = Joi.object().keys({
    filename: Joi.string().max(255).required()
  }).required();
  const { error } = schema.validate({ filename });
  if (error) {
    logger.error({ error }, `Validation failed for 'filename' request parameter: ${ error }`);
    throw error;
  }
}