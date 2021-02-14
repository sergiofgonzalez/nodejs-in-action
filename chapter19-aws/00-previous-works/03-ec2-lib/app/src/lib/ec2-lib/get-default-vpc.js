const debug = require('debug')('ec2-lib:get-default-vpc');
const AWS = require('aws-sdk');
const ec2 = new AWS.EC2({ region: 'us-east-1' });

async function getDefaultVpc() {
  return new Promise((resolve, reject) => {
    debug(`Getting default VPC`);
    ec2.describeVpcs({
      Filters: [{ Name: 'isDefault', Values: ['true'] }]
    }, (err, data) => {
      if (err) {
        debug(`ERROR: ec2.describeVpcs failed: ${ err.message }`);
        return reject(new Error(err));    
      }
      const defaultVpcId = data.Vpcs[0].VpcId;
      debug(`Default VPC ID: ${ defaultVpcId }`);
      return resolve(defaultVpcId);
    });
  });
}


module.exports = getDefaultVpc;