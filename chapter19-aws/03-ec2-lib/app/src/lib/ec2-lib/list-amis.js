const Joi = require('@hapi/joi');
const debug = require('debug')('ec2-lib:list-amis');
const AWS = require('aws-sdk');
const ec2 = new AWS.EC2({ region: 'us-east-1' });
const jmespath = require('jmespath');

async function listAMIs(namePattern) {
  return new Promise((resolve, reject) => {
    debug(`Validating argument: ${ namePattern }`);
    const schema = Joi.string().required();
    const { error } = schema.validate(namePattern);

    if (error) {
      debug(`ERROR: Validation failed: ${ error }`);
      return reject(new Error(error));
    }

    debug(`About to list AMIs matching: ${ namePattern }`);
    ec2.describeImages({
      Filters: [{ Name: 'name', Values: [namePattern] }]
    }, (err, data) => {
      if (err) {
        debug(`ERROR: ec2.describeImages failed: ${ err.message }`);
        return reject(new Error(err));    
      }
      const amiIds = jmespath.search(data, 'Images[*].ImageId');
      const descriptions = jmespath.search(data, 'Images[*].Description');
      debug(`Successfully obtained ${ amiIds.length } AMIs matching ${ namePattern }`);      
      const amis = new Map();
      for (let i = 0; i < amiIds.length; i++) {
        amis.set(amiIds[i], descriptions[i]);
      }
      return resolve(amis);
    });
  });
}


module.exports = listAMIs;