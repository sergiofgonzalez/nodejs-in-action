import { S3Client, ListObjectsCommand, HeadObjectCommand } from '@aws-sdk/client-s3';
import { fromIni } from '@aws-sdk/credential-provider-ini';
import pLimit from 'p-limit';
import createPinoLogger from 'pino';

const logger = createPinoLogger({ name: 'services:s3-list-objects', level: process.env.LOGGER_LEVEL ?? 'info' });

logger.debug({ AWS_PROFILE: process.env.AWS_PROFILE, AWS_DEFAULT_REGION: process.env.AWS_DEFAULT_REGION }, `Setting up S3Client`);
const s3Client = process.env.AWS_PROFILE ? new S3Client({
  credentials: fromIni({
    profile: process.env.AWS_PROFILE,
    region: process.env.AWS_DEFAULT_REGION ?? 'us-east-1'
  })
}) : new S3Client({
  region: process.env.AWS_DEFAULT_REGION ?? 'us-east-1'
});

const limit = pLimit(3); // max 3 parallel requests

export async function listS3Objects() {
  const params = {
    Bucket: process.env.BUCKET_NAME
  };

  logger.debug({ params }, `Listing objects in ${ params.Bucket }`);
  /* note that this will not work if you have more than 1000 objects in your bucket */
  const result = await s3Client.send(new ListObjectsCommand(params));
  const { Contents: files } = result;
  const mimeTypes = await getMimeTypesForRetrievedFiles(files);
  const filesWithMimeTypes = files.map((file, index) => {
    file.MimeType = mimeTypes[index];
    delete file.Owner;
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
    const result = await s3Client.send(new HeadObjectCommand(params));
    return result.ContentType;
  } catch (err) {
    logger.error({ err }, `HeadObjectCommand failed for reading mimeType: file=${ file.Key }, err=${ err.msg }`);
    throw new Error('Could not access object data');
  }
}
