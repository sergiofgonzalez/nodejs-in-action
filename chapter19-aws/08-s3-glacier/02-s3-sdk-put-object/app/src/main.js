import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3';
import { fromIni } from '@aws-sdk/credential-provider-ini';
import path from 'path';
import fs from 'fs';


let commandLineArgs;
if (process.argv.length > 3) {
  commandLineArgs = process.argv.slice(2);
} else {
  console.error(`ERROR: Usage node.js main {bucket} {path/to/local/file} [{profile}]`);
  process.exit(1);
}

const [ bucket, file, profileName ] = commandLineArgs;

const s3Client = profileName? new S3Client({
  region: 'us-east-1',
  credentials: fromIni({ profile: profileName })
}) : new S3Client({
  region: 'us-east-1'});



async function main() {
  const fileStream = fs.createReadStream(file);
  const key = path.basename(file);

  const putObjectParams = {
    Bucket: bucket,
    Key: key,
    Body: fileStream
  };

  try {
    const result = await s3Client.send(new PutObjectCommand(putObjectParams));
    console.log(`INFO: Successfully uploaded ${ file } to ${ bucket }: `, result);
  } catch (err) {
    console.error(`ERROR: Could not upload file ${ file }: ${ err.message }`);
    throw err;
  }
}

main()
  .then(() => console.log(`INFO: done!`))
  .catch((err) => console.error(`ERROR: operation could not be completed`, err));