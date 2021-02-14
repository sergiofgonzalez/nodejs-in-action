const Joi = require('@hapi/joi');
const debug = require('debug')('ec2-lib:create-security-group');
const AWS = require('aws-sdk');
const ec2 = new AWS.EC2({ region: 'us-east-1' });

async function createSecurityGroup(groupName, groupDescription, vpcId) {
  return new Promise((resolve, reject) => {
    debug(`Validating arguments: { ${ groupName }, ${ groupDescription}, ${ vpcId } }`);
    const schema = Joi.object().keys({
      groupName: Joi.string().required(),
      groupDescription: Joi.string().required(),
      vpcId: Joi.string().required()
    }).required();
    const { error } = schema.validate({ groupName, groupDescription, vpcId });

    if (error) {
      debug(`ERROR: Validation failed: ${ error }`);
      return reject(new Error(error));
    }

    debug(`About to create EC2 Security Group with name ${ groupName } (${ groupDescription }) on VPC ${ vpcId }`);
    ec2.createSecurityGroup({ 
      GroupName: groupName,
      Description: groupName,
      VpcId: vpcId
    },
    (err, data) => {
      if (err) {
        debug(`ERROR: ec2.createSecurityGroup failed: ${ err.message }`);
        return reject(new Error(err));    
      }
      const groupId = data.GroupId;
      ec2.authorizeSecurityGroupIngress({
        GroupId: groupId,
        IpPermissions: [{ 
          IpProtocol: 'tcp', 
          FromPort: 22, 
          ToPort: 22,
          IpRanges: [{ CidrIp: '0.0.0.0/0' }]
        }]
      }, (err) => {
        if (err) {
          debug(`ERROR: ec2.authorizeSecurityGroupIngress failed: ${ err.message }`);
          return reject(new Error(err));
        }
        return resolve(groupId);
      });
    });
  });
}


module.exports =  createSecurityGroup;