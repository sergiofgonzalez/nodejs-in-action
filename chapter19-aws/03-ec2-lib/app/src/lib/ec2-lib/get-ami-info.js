const Joi = require('@hapi/joi');
const debug = require('debug')('ec2-lib:get-ami-info');
const AWS = require('aws-sdk');
const ec2 = new AWS.EC2({ region: 'us-east-1' });

async function getAMIInfo(imageId) {
  return new Promise((resolve, reject) => {
    debug(`Validating argument: ${ imageId }`);
    const schema = Joi.string().required();
    const { error } = schema.validate(imageId);

    if (error) {
      debug(`ERROR: Validation failed: ${ error }`);
      return reject(new Error(error));
    }

    debug(`About to get AMI Info for: ${ imageId }`);
    ec2.describeImages({
      Filters: [{ Name: 'image-id', Values: [imageId] }]
    }, (err, data) => {
      if (err) {
        debug(`ERROR: ec2.describeImages failed: ${ err.message }`);
        return reject(new Error(err));    
      }
      const amiInfo = data.Images[0];
      return resolve(amiInfo);
    });
  });
}


module.exports = getAMIInfo;