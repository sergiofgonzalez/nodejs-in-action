import createLogger from 'pino';
import { getAttachmentInfo } from './lib/lib-attachment-info/index.js';

const logger = createLogger({ name: 'main' });

let commandLineArgs;
if (process.argv.length === 4) {
  commandLineArgs = process.argv.slice(2);
} else {
  logger.error({args: process.argv}, `Usage node.js main {bucket} {path/to/s3/file}`);
  process.exit(1);
}

const [ bucket, objectKey ] = commandLineArgs;


async function run() {
  logger.info({ bucket, objectKey }, `About to get attachment info`);
  const attachmentInfo = await getAttachmentInfo(bucket, objectKey);
  logger.info({ attachmentInfo }, `Successfully retrieved object info for ${ bucket }/${ objectKey }`);
}


run()
  .then(() => logger.info('done!!!'))
  .catch((err) => logger.error(`failed: ${ err. message }`));
