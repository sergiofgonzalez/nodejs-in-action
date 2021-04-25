import { GetObjectCommand, PutObjectCommand, S3Client } from '@aws-sdk/client-s3';
import { fromIni } from '@aws-sdk/credential-provider-ini';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';

function showUsageOnError() {
  console.error(`ERROR: Usage node.js main {bucket} {path/to/s3/object} {GET/PUT} [{profile}]`);
  process.exit(1);
}


let commandLineArgs;
if (process.argv.length > 5) {
  commandLineArgs = process.argv.slice(2);
} else {
  showUsageOnError();
}

const [ bucket, objectKey, action, profileName ] = commandLineArgs;

if (action !== 'GET' && action !== 'PUT') {
  showUsageOnError();
}

const s3Client = profileName? new S3Client({
  region: 'us-east-1',
  credentials: fromIni({ profile: profileName })
}) : new S3Client({
  region: 'us-east-1'});


const params = {
  Bucket: bucket,
  Key: objectKey
};


async function run() {
  // create a presigned URL
  let command;
  if (action === 'GET') {
    command = new GetObjectCommand(params);
  } else {
    command = new PutObjectCommand(params);
  }

  const signedUrl = await getSignedUrl(s3Client, command, { expiresIn: 300 });
  console.log(`Signed URL for ${ bucket }/${ objectKey }: ${ signedUrl }`);
}




run()
  .then(() => console.log(`INFO: done!`))
  .catch((err) => console.error(`ERROR: operation could not be completed`, err));