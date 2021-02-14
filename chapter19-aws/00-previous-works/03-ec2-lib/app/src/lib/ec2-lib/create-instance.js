const Joi = require('@hapi/joi');
const debug = require('debug')('ec2-lib:create-instance');
const AWS = require('aws-sdk');
const ec2 = new AWS.EC2({ region: 'us-east-1' });

async function createInstance(amiId, subnetId, keyName, securityGroupId) {
  return new Promise((resolve, reject) => {
    debug(`Validating arguments: { ${ amiId }, ${ subnetId}, ${ keyName }, ${ securityGroupId }`);
    const schema = Joi.object().keys({
      amiId: Joi.string().required(),
      subnetId: Joi.string().required(),
      keyName: Joi.string().required(),
      securityGroupId: Joi.string().required()
    }).required();
    const { error } = schema.validate({ amiId, subnetId, keyName, securityGroupId });

    if (error) {
      debug(`ERROR: Validation failed: ${ error }`);
      return reject(new Error(error));
    }

    debug(`About to create EC2 instance using AMI ${ amiId } on subnet ${ subnetId } with key ${ keyName }`);
    ec2.runInstances({ 
      ImageId: amiId,
      InstanceType: 't2.micro',
      KeyName: keyName,
      MinCount: 1,
      MaxCount: 1,
      SecurityGroupIds: [securityGroupId],
      SubnetId: subnetId,
      BlockDeviceMappings: [{ 
        DeviceName: '/dev/xvda',
        Ebs: {
          DeleteOnTermination: true,
          Encrypted: true,
          VolumeSize: 8
        }
      }]
    },
    (err, data) => {
      if (err) {
        debug(`ERROR: ec2.runInstances failed: ${ err.message }`);
        return reject(new Error(err));    
      }
      const instanceId = data.Instances[0].InstanceId;
      debug(`Successfully created EC2 instance with ID: ${ instanceId }`);
      resolve(instanceId);
    });
  });
}


module.exports =  createInstance;