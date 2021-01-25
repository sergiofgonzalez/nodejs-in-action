const createInstance = require('./create-instance');
const getInstanceInfo = require('./get-instance-info');
const getDefaultVpc = require('./get-default-vpc');
const listSubnetsInDefaultVpc = require('./list-subnets-in-default-vpc');
const listAMIs = require('./list-amis');
const getAMIInfo = require('./get-ami-info');
const createSecurityGroup = require('./create-security-group');
const deleteSecurityGroup = require('./delete-security-group');
const terminateInstance = require('./terminate-instance');

module.exports = {
  createInstance,
  getInstanceInfo,
  terminateInstance,
  getDefaultVpc,
  listSubnetsInDefaultVpc,
  listAMIs,
  getAMIInfo,
  createSecurityGroup,
  deleteSecurityGroup
};