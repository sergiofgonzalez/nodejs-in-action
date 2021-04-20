import createLogger from 'pino';
import ow from 'ow';
import AWS from 'aws-sdk';

const logger = createLogger({ name: 'get-object-info', level: 'debug' });

const s3 = new AWS.S3({ apiVersion: '2006-03-01' });

export async function getObjectInfo(s3Bucket, s3ObjectKey) {
  logger.debug({ s3Bucket, s3ObjectKey }, `About to validate arguments`);
  ow({ s3Bucket, s3ObjectKey }, ow.object.exactShape({
    s3Bucket: ow.string.minLength(3).maxLength(63),
    s3ObjectKey: ow.string.minLength(1)
  }));

  logger.debug({ s3Bucket, s3ObjectKey }, `About read object info with s3.headObject()`);
  try {
    const params = {
      Bucket: s3Bucket,
      Key: s3ObjectKey
    };
    const objectData = await s3.headObject(params).promise();
    logger.info({ params, objectData }, `Successfully retrieved object info with s3.headObject`);
    return objectData;
  } catch (err) {
    logger.error({ err, s3Bucket, s3ObjectKey }, `getObjectInfo failed: ${ err.message }`);
    throw err;
  }
}