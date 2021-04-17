import { buildLogger } from '../../lib/logger.js';
import createError from 'http-errors';
import { uploadToS3 } from '../../services/s3-file-upload.js';
import { listS3Objects } from '../../services/s3-list-objects.js';
import { deleteFromS3 } from '../../services/s3-file-delete.js';
import util from 'util';

const logger = buildLogger('routes:upload');

export async function upload(req, res, next) {
  logger.debug(`About to process file upload request`);

  req.pipe(req.busboy);

  req.busboy.once('file', async (fieldname, filestream, filename, encoding, mimetype) => {
    logger.debug(`Processing file upload request: HTML element name=${ fieldname }, filename=${ filename }`);
    try {
      const data = await uploadToS3(filename, filestream, encoding, mimetype);
      logger.info(`Successfully uploaded file to S3: ${ util.inspect(data) }`);
      res.redirect('back');
    } catch (err) {
      logger.error(`Could not upload to S3: ${ err.message }`);
      if (filestream.truncated) {
        await tryDeleteTruncatedFile(filename);
        return next(createError.PayloadTooLarge('File sent is larger than the specified limit'));
      }
      return next(createError.InternalServerError('Could not upload file'));
    }
  });
}

export async function listUploadedfiles(req, res, next) {

  try {
    const uploadedFiles = await listS3Objects();
    return res.json(uploadedFiles);
  } catch (err) {
    logger.error(`Could not list files uploaded to S3: ${ err.message }`);
    return next(createError.InternalServerError('Could not list files uploaded to S3'));
  }
}

async function tryDeleteTruncatedFile(filename) {
  try {
    await deleteFromS3(filename);
  } catch (err) {
    // report error, but swallow exception
    logger.error(`Truncated uploaded file ${ filename } could not be deleted: ${ err.message }`);
  }
}