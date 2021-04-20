import createLogger from 'pino';
import ow from 'ow';
import { getObjectInfo } from './get-object-info.js';
import { getSignedUrl } from './get-signed-url.js';

const logger = createLogger({ name: 'lib-attachment-info', level: 'debug' });

export async function getAttachmentInfo(s3Bucket, s3ObjectKey, ttlSeconds = 300) {
  logger.debug({ s3Bucket, s3ObjectKey, ttlSeconds }, `About to validate arguments`);
  ow({ s3Bucket, s3ObjectKey, ttlSeconds }, ow.object.exactShape({
    s3Bucket: ow.string.minLength(3).maxLength(63),
    s3ObjectKey: ow.string.minLength(1),
    ttlSeconds: ow.number.inRange(5, 60 * 30)
  }));

  logger.debug({ s3Bucket, s3ObjectKey, ttlSeconds }, `About to get object info and signed URL (in parallel)`);
  const [ objectInfo, url ] = await Promise.all([
    getObjectInfo(s3Bucket, s3ObjectKey),
    getSignedUrl(s3Bucket, s3ObjectKey, ttlSeconds)
  ]);
  logger.info({ s3Bucket, s3ObjectKey, ttlSeconds }, `Successfully retrieved object info and signed URL`);

  return { ...objectInfo, url };
}