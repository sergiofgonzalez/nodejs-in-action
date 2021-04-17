import { buildLogger } from '../lib/logger.js';
import AWS from 'aws-sdk';

const logger = buildLogger('services:s3-file-delete');

const s3 = new AWS.S3({ apiVersion: '2006-03-01' });


export async function deleteFromS3(filename) {

  const deleteParams = {
    Bucket: process.env.BUCKET_NAME,
    Key: filename
  };

  try {
    await s3.deleteObject(deleteParams).promise();
    logger.info(`Successfully deleted object: ${ deleteParams.Bucket }/${ deleteParams.Key }`);
  } catch (err) {
    logger.error(`Could not delete object to S3: ${ err.message }`);
    throw err;
  }
}