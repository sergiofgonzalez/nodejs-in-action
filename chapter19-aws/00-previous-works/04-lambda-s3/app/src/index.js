const aws = require('aws-sdk');

const s3 = new aws.S3({ apiVersion: '2006-03-01' });

console.log('INFO: Loading function');

exports.handler = async (event) => {
  console.log('INFO: handler: Accessing S3');

  const bucket = event.bucket;

  const params = {
    Bucket: bucket
  };

  try {
    console.log(`INFO: handler: checking bucket: ${ params.Bucket }`);
    const result = await s3.headBucket(params).promise();
    console.log(`INFO: handler: success, bucket ${ bucket } is accessible`);
    return result;
  } catch (err) {
    console.error(`ERROR: ${ err.message }`);
    throw err;
  }
};
