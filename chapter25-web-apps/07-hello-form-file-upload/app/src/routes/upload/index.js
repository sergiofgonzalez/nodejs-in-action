import { buildLogger } from '../../lib/logger.js';
import createError from 'http-errors';
import { join } from 'path';
import fs, { promises as fsPromises } from 'fs';

const logger = buildLogger('routes:upload');

export async function upload(req, res, next) {
  logger.debug(`About to process file upload request`);

  req.pipe(req.busboy);

  req.busboy.once('file', (fieldname, fileStream, filename, encoding, mimetype) => {
    console.log(`File [${ fieldname }]: filename: ${ filename }, encoding: ${ encoding }, mimetype: ${ mimetype }`);
    console.log(`Uploading ${ filename }`);
    const uploadPath = join(process.env.STATIC_RESOURCES_PATH, 'images', filename);
    const writeStream = fs.createWriteStream(uploadPath);
    fileStream.pipe(writeStream);

    fileStream.on('data', data => {
      console.log(`File [${ fieldname }]: received chunk of ${ data.length }`);
    });

    fileStream.on('end', () => {
      console.log(`File[${ fieldname }] completed`);
    });
    fileStream.on('close', () => {
      if (fileStream.truncated) {
        logger.error(`File sent is larger than the specified limit`);
        return next(createError.PayloadTooLarge(`File sent is larger than the specified limit`));
      }
      logger.debug(`${ filename } correctly uploaded to ${ uploadPath }`);
      res.redirect('back');
    });

    fileStream.on('error', (err) => {
      logger.error(`Could not save uploaded file on the server: ${ err.message }`);
      return next(createError.InternalServerError('Uploaded file could not be saved'));
    });
  });
}


export async function listUploadedfiles(req, res, next) {
  const uploadPath = join(process.env.STATIC_RESOURCES_PATH, 'images');
  logger.debug(`listing contents of ${ uploadPath }`);

  try {
    const uploadedFiles = await fsPromises.readdir(uploadPath);
    return res.json(uploadedFiles);
  } catch (err) {
    logger.error(`Could not list files uploaded to the server: ${ err.message }`);
    return next(createError.InternalServerError('Could not list files uploaded to the server'));
  }

}