import { buildLogger } from '../lib/logger.js';
import AWS from 'aws-sdk';
import pLimit from 'p-limit';

const logger = buildLogger('services:s3-list-objects');

const s3 = new AWS.S3({ apiVersion: '2006-03-01' });

const limit = pLimit(3); // max 3 parallel requests

export async function listS3Objects() {
  const params = {
    Bucket: process.env.BUCKET_NAME
  };

  logger.debug(`Listing objects in ${ params.Bucket }`);
  const result = await s3.listObjectsV2(params).promise();
  const { Contents: files } = result;
  const mimeTypes = await getMimeTypesForRetrievedFiles(files);
  const filesWithMimeTypes = files.map((file, index) => {
    file.MimeType = mimeTypes[index];
    return file;
  });
  return filesWithMimeTypes;
}

async function getMimeTypesForRetrievedFiles(files) {
  const tasks = files.map(file => limit(() => getMimeTypeTask(file)));
  const mimeTypes = await Promise.all(tasks);
  return mimeTypes;
}

async function getMimeTypeTask(file) {
  const params = {
    Bucket: process.env.BUCKET_NAME,
    Key: file.Key
  };
  try {
    const result = await s3.headObject(params).promise();
    return result.ContentType;
  } catch (err) {
    console.error(`s3.headObject failed for reading mimeType: file=${ file.Key }, err=${ err.msg }`);
    throw new Error('Could not access object data');
  }
}