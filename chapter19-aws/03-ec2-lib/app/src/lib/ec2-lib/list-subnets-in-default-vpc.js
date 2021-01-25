const debug = require('debug')('ec2-lib:list-subnets');
const AWS = require('aws-sdk');
const ec2 = new AWS.EC2({ region: 'us-east-1' });
const jmespath = require('jmespath');
const getDefaultVpc = require('./get-default-vpc');

async function listSubnetsInDefaultVpc() {
  const vpcId = await getDefaultVpc();
  return new Promise((resolve, reject) => {
    ec2.describeSubnets({
      Filters: [{ Name: 'vpc-id', Values: [vpcId] }]
    }, (err, data) => {
      if (err) {
        debug(`ERROR: ec2.describeSubnets failed: ${ err.message }`);
        return reject(new Error(err));
      }   
      const subnetIds = jmespath.search(data, 'Subnets[*].SubnetId');
      return resolve(subnetIds);
    });
  });
}


module.exports = listSubnetsInDefaultVpc;