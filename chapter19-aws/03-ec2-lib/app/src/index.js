'use strict';

const ec2Lib = require('./lib/ec2-lib');
const util = require('util');
const readline = require('readline');


(async () => {
  try {
    console.log(`Creating EC2 Instance...`);
    const { instanceId, securityGroupId } = await createEc2Instance();
    console.log(`Instance has been created: ${ instanceId }`);

    await sleepUntilRunning(instanceId);
    
    await displayInstanceInfo(instanceId);
    await waitForUserInputBeforeTerminating();
    
    await terminateEc2Instance(instanceId, securityGroupId);
    console.log(`Successfully cleaned up EC2 and Security Group!`);
  } catch (err) {
    console.log(`ERROR: Could not complete operations: ${ err.message }`);
    process.exit(1);
  }
})();


async function createEc2Instance() {
  // latest Amazon Linux 2 AMI, as of 2020-02-09
  let amiId = 'ami-062f7200baf2fa504';
  const amiInfo = await ec2Lib.getAMIInfo(amiId);
  console.log(`AMI Info for ${ amiId }: ${ util.inspect(amiInfo) }`);

  // Check if something newer on the same line
  const imageName = 'amzn2-ami-hvm-2.0.20191217.0-x86_64-gp2';
  const amis = await ec2Lib.listAMIs(imageName);
  console.log(`AMIs with pattern: ${ imageName }`);
  console.log(amis);

  // Opt for the first entry
  amiId = amis.keys().next().value;
  if (!amiId) {
    console.log(`ERROR: unexpected: amiId was not found!`);
    process.exit(1);
  }
  
  console.log(`Will create EC2 instance with AMI ID: ${ amiId }`);

  // Get the default VPC ID
  const defaultVpcId = await ec2Lib.getDefaultVpc();
  console.log(`Default VPC ID: ${ defaultVpcId }`);

  // Get one subnet
  const subnetsInDefaultVpc = await ec2Lib.listSubnetsInDefaultVpc();
  const subnetId = subnetsInDefaultVpc[0];
  console.log(`Will create EC2 instance on subnet ${ subnetId } from default VPC`);
  

  // Create the security group that would allow us to log into the instance
  const securityGroupId = await ec2Lib.createSecurityGroup('my-security-group', 'My security Group', defaultVpcId);
  console.log(`Security Group: ${ util.inspect(securityGroupId) }`);

  // Create the instance
  const instanceId = await ec2Lib.createInstance(amiId, subnetId, 'mykey', securityGroupId);
  console.log(`Created EC2 Instance: ${ instanceId }`);
  return { instanceId, securityGroupId };
}


function sleep(millis) {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve();
    }, millis);
  });
}

async function sleepUntilRunning(instanceId) {
  let done = false;
  while (!done) {
    const instanceInfo = await ec2Lib.getInstanceInfo(instanceId);
    const instanceState = instanceInfo.State;
    console.log(`Instance ${ instanceId } is ${ instanceState.Name }`);
    if (instanceState.Code !== 16) {
      await sleep(10000);
    } else {
      done = true;
    }
  }
}


async function terminateEc2Instance(instanceId, securityGroupId) {
  // Terminate the instance
  console.log(`Terminating Instance: ${ instanceId }`);
  const instanceInfo = await ec2Lib.terminateInstance(instanceId);
  console.log(`EC2 Instance ${ instanceId }: ${ instanceInfo.CurrentState.Name } (was ${ instanceInfo.PreviousState.Name })`);

  // Wait a few seconds until Network interface is deleted
  await sleep(30000);

  // Delete the security group
  console.log(`Deleting Security Group: ${ securityGroupId }`);
  await ec2Lib.deleteSecurityGroup(securityGroupId);
}

async function displayInstanceInfo(instanceId) {
  // Show how to connect to the instance
  const instanceInfo = await ec2Lib.getInstanceInfo(instanceId);
  console.log(`EC2 instance ${ instanceId } is running!`);
  console.log(`Use the following command to connect:`);
  console.log(`ssh -i ${ instanceInfo.KeyName }.pem ec2-user@${ instanceInfo.PublicDnsName }`);
}

async function waitForUserInputBeforeTerminating() {
  async function getUserInput() {
    const rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout
    });

    return new Promise(resolve => {
      rl.question(`Type 'Y' to terminate the instance [Y|other]: `,
        (userInput) => {
          rl.close();
          resolve(userInput);
        });
    });
  }

  let done = false;
  while (!done) {
    const userInput = await getUserInput();
    if (userInput === 'Y') {
      done = true;
    }    
  }
}