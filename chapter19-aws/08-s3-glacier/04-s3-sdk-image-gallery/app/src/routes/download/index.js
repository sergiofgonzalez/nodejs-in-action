import { buildLogger } from '../../lib/logger.js';
import Joi from 'joi';
import createError from 'http-errors';
import AWS from 'aws-sdk';

const s3 = new AWS.S3({ apiVersion: '2006-03-01' });


const logger = buildLogger('routes:download');

export async function download(req, res, next) {
  logger.debug(`About to process file download request for ${ req.params.fileKey }`);
  const fileKey = req.params.fileKey;

  try {
    validateParameter(fileKey);
  } catch (err) {
    logger.error(`Failed to validate request parameter "fileKey"=${ fileKey }: ${ err.message }`);
    return next(createError.BadRequest(`"fileKey" parameter is required`));
  }

  const downloadParams = {
    Bucket: process.env.BUCKET_NAME,
    Key: fileKey
  };

  const s3ObjectRequest = s3.getObject(downloadParams);
  s3ObjectRequest.on('httpHeaders', (statusCode, headers) => {
    res.set('Content-Length', headers['content-length']);
    res.set('Content-Type', 'application/octet-stream; charset=utf-8'); /* instead of using headers['content-type'] */
    res.set('Content-Disposition', `attachment; filename=${ fileKey } filename*=${ fileKey }`);
  });

  const readableStream = s3ObjectRequest.createReadStream();
  readableStream.pipe(res);

  readableStream.on('error', (err) => {
    if (err.code === 'NoSuchKey') {
      return next(createError.NotFound('Specified file does not exist'));
    }

    logger.error(`Could not serve S3 object: ${ err.message }`);
    return next(createError.InternalServerError('Could not download file from S3'));
  });
}

function validateParameter(fileKey) {
  logger.debug(`Validating request parameter fileKey: ${ fileKey }`);
  const schema = Joi.object().keys({
    fileKey: Joi.string().max(255).required()
  }).required();
  const { error } = schema.validate({ fileKey });
  if (error) {
    logger.error(`Validation failed for 'fileKey' request parameter: ${ error }`);
    throw error;
  }
}
