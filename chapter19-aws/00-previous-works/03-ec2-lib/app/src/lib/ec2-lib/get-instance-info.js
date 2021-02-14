const Joi = require('@hapi/joi');
const debug = require('debug')('ec2-lib:get-instance-info');
const AWS = require('aws-sdk');
const ec2 = new AWS.EC2({ region: 'us-east-1' });

async function getInstanceInfo(instanceId) {
  return new Promise((resolve, reject) => {
    debug(`Validating argument: ${ instanceId }`);
    const schema = Joi.string().required();
    const { error } = schema.validate(instanceId);

    if (error) {
      debug(`ERROR: Validation failed: ${ error }`);
      return reject(new Error(error));
    }

    debug(`About to get EC2 instance info for: ${ instanceId }`);
    ec2.describeInstances({ InstanceIds: [instanceId] },
      (err, data) => {
        if (err) {
          debug(`ERROR: ec2.describeInstances failed: ${ err.message }`);
          return reject(new Error(err));    
        }
        const instanceIdInfo = data.Reservations[0].Instances[0];
        debug(`Successfully obtained info for ${ instanceId }`);      
        return resolve(instanceIdInfo);
      });
  });
}


module.exports =  getInstanceInfo;