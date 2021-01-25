const Joi = require('@hapi/joi');
const debug = require('debug')('ec2-lib:terminate-instance');
const AWS = require('aws-sdk');
const ec2 = new AWS.EC2({ region: 'us-east-1' });

async function terminateInstance(instanceId) {
  return new Promise((resolve, reject) => {
    debug(`Validating argument: ${ instanceId }`);
    const schema = Joi.string().required();
    const { error } = schema.validate(instanceId);

    if (error) {
      debug(`ERROR: Validation failed: ${ error }`);
      return reject(new Error(error));
    }

    debug(`About to terminate EC2 instance  ${ instanceId }`);
    ec2.terminateInstances({
      InstanceIds: [instanceId]
    },
    (err, data) => {
      if (err) {
        debug(`ERROR: ec2.terminateInstances failed: ${ err.message }`);
        return reject(new Error(err));    
      }
      debug(`EC2 Instance ${ instanceId } successfully terminated`);
      const instanceInfo = data.TerminatingInstances[0];
      resolve(instanceInfo);
    });
  });
}


module.exports =  terminateInstance;