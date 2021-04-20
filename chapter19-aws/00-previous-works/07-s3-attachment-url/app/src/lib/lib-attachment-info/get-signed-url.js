import createLogger from 'pino';
import ow from 'ow';
import AWS from 'aws-sdk';

const logger = createLogger({ name: 'get-signed-url', level: 'debug' });

const s3 = new AWS.S3({ apiVersion: '2006-03-01' });

export async function getSignedUrl(s3Bucket, s3ObjectKey, ttlSeconds) {
  logger.debug({ s3Bucket, s3ObjectKey, ttlSeconds }, `About to validate arguments`);
  ow({ s3Bucket, s3ObjectKey, ttlSeconds }, ow.object.exactShape({
    s3Bucket: ow.string.minLength(3).maxLength(63),
    s3ObjectKey: ow.string.minLength(1),
    ttlSeconds: ow.number.inRange(5, 60 * 30)
  }));

  logger.debug({ s3Bucket, s3ObjectKey, ttlSeconds }, `About read object info with s3.getSignedUrlPromise()`);
  try {
    const params = {
      Bucket: s3Bucket,
      Key: s3ObjectKey,
      Expires: ttlSeconds
    };
    const url = await s3.getSignedUrlPromise('getObject', params);
    logger.info({ params, url }, `Successfully retrieved signed URL with s3.getSignedUrlPromise`);
    return url;
  } catch (err) {
    logger.error({ err, s3Bucket, s3ObjectKey, ttlSeconds }, `getSignedUrl failed: ${ err.message }`);
    throw err;
  }
}