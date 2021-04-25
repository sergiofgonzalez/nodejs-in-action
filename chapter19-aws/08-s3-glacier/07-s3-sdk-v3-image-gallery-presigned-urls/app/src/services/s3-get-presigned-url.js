import { GetObjectCommand, PutObjectCommand, S3Client } from '@aws-sdk/client-s3';
import { fromIni } from '@aws-sdk/credential-provider-ini';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';
import createPinoLogger from 'pino';
import Joi from 'joi';

const logger = createPinoLogger({ name: 'services:s3-get-presigned-url', level: process.env.LOGGER_LEVEL ?? 'info' });

logger.debug({ AWS_PROFILE: process.env.AWS_PROFILE, AWS_DEFAULT_REGION: process.env.AWS_DEFAULT_REGION }, `Setting up S3Client`);
const s3Client = process.env.AWS_PROFILE ? new S3Client({
  credentials: fromIni({
    profile: process.env.AWS_PROFILE,
    region: process.env.AWS_DEFAULT_REGION ?? 'us-east-1'
  })
}) : new S3Client({
  region: process.env.AWS_DEFAULT_REGION ?? 'us-east-1'
});



export async function getPresignedUrl({ filename, action='GET', ttlSeconds=300 }) {
  validateParameters({ filename, action, ttlSeconds });

  const params = {
    Bucket: process.env.BUCKET_NAME,
    Key: filename
  };

  let command;
  if (action === 'GET') {
    command = new GetObjectCommand(params);
  } else {
    command = new PutObjectCommand(params);
  }

  const presignedUrl = await getSignedUrl(s3Client, command, ttlSeconds);
  logger.info({ bucket: params.Bucket, key: params.Key, expiresIn: ttlSeconds, presignedUrl }, `Presigned URL for ${ params.Bucket }/${ params.Key }`);

  return presignedUrl;
}

function validateParameters({ filename, action, ttlSeconds }) {
  logger.debug({ filename, action, ttlSeconds }, `Validating getPresignedUrl function arguments }`);
  const schema = Joi.object().keys({
    filename: Joi.string().min(3).max(63).required(),
    action: Joi.string().valid('GET', 'PUT').required(),
    ttlSeconds: Joi.number().min(5).max(30 * 60).required()
  }).required();
  const { error } = schema.validate({ filename, action, ttlSeconds });
  if (error) {
    logger.error({ error }, `Validation failed for getPresignedUrl parameters: filename=${ filename }, action=${ action }: ${ error }`);
    throw error;
  }
}


