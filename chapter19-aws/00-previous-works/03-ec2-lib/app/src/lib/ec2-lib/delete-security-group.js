const Joi = require('@hapi/joi');
const debug = require('debug')('ec2-lib:create-security-group');
const AWS = require('aws-sdk');
const ec2 = new AWS.EC2({ region: 'us-east-1' });

async function deleteSecurityGroup(groupId) {
  return new Promise((resolve, reject) => {
    debug(`Validating arguments: ${ groupId }`);
    const schema = Joi.string().required();
    const { error } = schema.validate(groupId);

    if (error) {
      debug(`ERROR: Validation failed: ${ error }`);
      return reject(new Error(error));
    }

    debug(`About to delete EC2 Security Group with id ${ groupId }`);
    ec2.deleteSecurityGroup({ 
      GroupId: groupId
    },
    (err) => {
      if (err) {
        debug(`ERROR: ec2.deleteSecurityGroup failed: ${ err.message }`);
        return reject(new Error(err));    
      }
      resolve();
    });
  });
}


module.exports =  deleteSecurityGroup;