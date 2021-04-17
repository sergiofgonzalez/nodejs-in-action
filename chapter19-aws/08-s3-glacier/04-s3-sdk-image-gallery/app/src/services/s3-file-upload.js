import { PassThrough } from 'stream';
import { buildLogger } from '../lib/logger.js';
import AWS from 'aws-sdk';
import util from 'util';

const logger = buildLogger('services:s3-file-upload');

const s3 = new AWS.S3({ apiVersion: '2006-03-01' });


export async function uploadToS3(filename, filestream, encoding, mimetype) {
  let bytesWritten = 0;
  const monitor = new PassThrough();
  monitor.on('data', chunk => {
    bytesWritten += chunk.length;
    logger.debug(`Processing filename=${ filename }: received chunk of ${ chunk.length }, bytes written: ${ bytesWritten }`);
  } );
  monitor.on('finish', () => {
    logger.debug(`Processing filename=${ filename }: ${ bytesWritten } bytes written (truncated: ${ filestream.truncated })`);
  });

  filestream.pipe(monitor);

  const uploadParams = {
    Bucket: process.env.BUCKET_NAME,
    Key: filename,
    Body: monitor,
    ContentType: mimetype,
    ContentEncoding: encoding,
    ServerSideEncryption: 'AES256'
  };

  // uploadOptions is optional, but included for reference
  const uploadOptions = { partSize: 10 * 1024 * 1024, queueSize: 3 };

  try {
    const data = await s3.upload(uploadParams, uploadOptions).promise();
    if (filestream.truncated) {
      logger.error(`${ uploadParams.Bucket }/${ uploadParams.Key } truncated: was larger than the specified limit`);
      throw new Error('File sent is larger than the specified limit');
    }
    logger.info(`Successfully uploaded object: ${ uploadParams.Bucket }/${ uploadParams.Key }: ${ util.inspect(data) }`);
    return data;
  } catch (err) {
    logger.error(`Could not upload object to S3: ${ err.message }`);
    throw err;
  }
}