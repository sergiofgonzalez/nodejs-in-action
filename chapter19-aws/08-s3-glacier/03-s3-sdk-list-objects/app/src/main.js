import { S3Client, ListObjectsCommand } from '@aws-sdk/client-s3';
import { fromIni } from '@aws-sdk/credential-provider-ini';


let commandLineArgs;
if (process.argv.length > 2) {
  commandLineArgs = process.argv.slice(2);
} else {
  console.error(`ERROR: Usage node.js main {bucket} [{profile}]`);
  process.exit(1);
}

const [ bucket, profileName ] = commandLineArgs;

const s3Client = profileName? new S3Client({
  region: 'us-east-1',
  credentials: fromIni({ profile: profileName })
}) : new S3Client({
  region: 'us-east-1'});

const params = {
  Bucket: bucket
};


async function run() {
  let truncated = true;
  let pageMarker;

  while (truncated) {
    try {
      const response = await s3Client.send(new ListObjectsCommand(params));
      response.Contents.forEach(item => console.log(item.Key));
      truncated = response.IsTruncated;
      if (truncated) {
        pageMarker = response.Contents.slice(-1)[0].Key;
        params.Marker = pageMarker;
      }
    } catch (err) {
      console.error(`ERROR: could not list bucket objects: ${ err.message }`);
      truncated = false;
      throw err;
    }
  }
}

run()
  .then(() => console.log(`INFO: done!`))
  .catch((err) => console.error(`ERROR: operation could not be completed`, err));