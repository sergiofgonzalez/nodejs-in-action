const { EC2Client, CreateTagsCommand } = require('@aws-sdk/client-ec2');

const ec2Client = new EC2Client();

exports.handler = async (event) => {
  console.log(event);


  const userName = event.detail.userIdentity.arn.split('/')[1];
  const instanceId = event.detail.responseElements.instancesSet.items[0].instanceId;

  console.log(`INFO: adding owner tag: '${ userName }' to instance ${ instanceId }`);

  const params = {
    Resources: [instanceId],
    Tags: [{ Key: 'Owner', Value: userName }]
  };

  const command = new CreateTagsCommand(params);
  try {
    const tagData = await ec2Client.send(command);
    return tagData;
  } catch (err) {
    console.error(`ERROR: could not tag instance: ${ err.message }`);
    throw err;
  }
};
