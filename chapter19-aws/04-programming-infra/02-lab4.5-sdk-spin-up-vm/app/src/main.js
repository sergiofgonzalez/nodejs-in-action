import {
  AuthorizeSecurityGroupIngressCommand,
  CreateSecurityGroupCommand,
  DeleteSecurityGroupCommand,
  DescribeImagesCommand,
  DescribeInstancesCommand,
  DescribeInstanceStatusCommand,
  DescribeKeyPairsCommand,
  DescribeSecurityGroupsCommand,
  DescribeSubnetsCommand,
  DescribeVpcsCommand,
  EC2Client,
  RunInstancesCommand,
  TerminateInstancesCommand
} from '@aws-sdk/client-ec2';
import { fromIni } from '@aws-sdk/credential-provider-ini';
import { getMyPublicIpAddress } from './lib/get-my-public-ip-address.js';
import readline from 'readline';

let commandLineArgs;
if (process.argv.length > 2) {
  commandLineArgs = process.argv.slice(2);
} else {
  console.error(`ERROR: Usage node main.js {key-pair-name} [{profile}]`);
  process.exit(1);
}

const [ keyPairName, profileName ] = commandLineArgs;

const ec2Client = profileName? new EC2Client({
  region: 'us-east-1',
  credentials: fromIni({ profile: profileName })
}) : new EC2Client({
  region: 'us-east-1'});

async function getImageData(imageNamePattern) {
  const params = {
    Filters: [
      { Name: 'name', Values: [ imageNamePattern ] }
    ]
  };

  const command = new DescribeImagesCommand(params);
  try {
    const imageData = await executeCommand(command);
    if (imageData.Images.length > 0) {
      return imageData.Images[0];
    } else {
      throw new Error(`No images matching '${ imageNamePattern }'`);
    }
  } catch (err) {
    console.error(`ERROR: getImageId: Could not obtain imageData for '${ imageNamePattern }': ${ err.message }`);
    throw new Error(err.message);
  }
}

async function getDefaultVPC() {
  const params = {
    Filters: [
      { Name: 'isDefault', Values: [ true ] }
    ]
  };
  const command = new DescribeVpcsCommand(params);

  try {
    const vpcData = await executeCommand(command);
    if (vpcData.Vpcs.length > 0) {
      return vpcData.Vpcs[0];
    } else {
      throw new Error(`Could not find default VPC`);
    }
  } catch (err) {
    console.error(`ERROR: getDefaultVPC: Could not obtain default VPC info: ${ err.message }`);
    throw new Error(err.message);
  }
}

async function getFirstSubnet(vpcId) {
  const params = {
    Filters: [
      { Name: 'vpc-id', Values: [ vpcId ] }
    ],
    MaxResults: 5 // expects a value >= 5
  };
  const command = new DescribeSubnetsCommand(params);

  try {
    const subnetData = await executeCommand(command);
    if (subnetData.Subnets.length > 0) {
      return subnetData.Subnets[0];
    } else {
      throw new Error(`Could not find the first subnet in VPC ${ vpcId }`);
    }
  } catch (err) {
    console.error(`ERROR: getFirstSubnet: Could not obtain default VPC info: ${ err.message }`);
    throw new Error(err.message);
  }
}

async function getSecurityGroup(vpcId) {
  const params = {
    Filters: [
      { Name: 'description', Values: [ 'Temporary security group created by Node.js' ] },
      { Name: 'group-name', Values: [ 'temp-security-group-nodejs' ] },
      { Name: 'vpc-id', Values: [ vpcId ] }
    ]
  };

  const command = new DescribeSecurityGroupsCommand(params);
  try {
    const sgData = await executeCommand(command);
    return sgData.SecurityGroups.length > 0? { GroupId: sgData.SecurityGroups[0].GroupId } : { GroupId: null };
  } catch (err) {
    console.error(`ERROR: getSecurityGroup: Could not obtain info about security group: ${ err.message }`);
    throw new Error(err.message);
  }

}

async function createSecurityGroup(vpcId) {
  const params = {
    Description: 'Temporary security group created by Node.js',
    GroupName: 'temp-security-group-nodejs',
    VpcId: vpcId
  };
  const command = new CreateSecurityGroupCommand(params);

  try {
    const sgData = await executeCommand(command);
    return { GroupId: sgData.GroupId };
  } catch (err) {
    console.error(`ERROR: createSecurityGroup: Could not createSecurityGroup on vpcId '${ vpcId }': ${ err.message }`);
    throw new Error(err.message);
  }
}

async function deleteSecurityGroup(groupId) {
  const params = {
    GroupId: groupId
  };

  const command = new DeleteSecurityGroupCommand(params);

  try {
    await executeCommand(command);
  } catch (err) {
    console.error(`ERROR: deleteSecurityGroup: could not delete security group id '${ groupId }'`);
  }
}

async function openSSH(securityGroupId) {
  const myIpAddress = await getMyPublicIpAddress();

  const params = {
    GroupId: securityGroupId,
    IpPermissions: [
      {
        IpProtocol: 'tcp',
        FromPort: 22,
        ToPort: 22,
        IpRanges: [{ CidrIp: `${ myIpAddress }/32` }]
      }
    ]
  };

  const command = new AuthorizeSecurityGroupIngressCommand(params);

  try {
    await executeCommand(command);
  } catch (err) {
    console.error(`ERROR: getDefaultVPC: Could not obtain default VPC info: ${ err.message }`);
    throw new Error(err.message);
  }

}

async function validateKeyPairExist(keyPairName) {
  // just for fun we retrieve all keyPairs and validate using a for loop
  const params = {};
  const command = new DescribeKeyPairsCommand(params);

  try {
    const keyPairsData = await executeCommand(command);
    const nameMatches = (element) => element.KeyName === keyPairName;
    const exists = keyPairsData?.KeyPairs.some(nameMatches);
    return exists;
  } catch (err) {
    console.error(`ERROR: getDefaultVPC: Could not obtain default VPC info: ${ err.message }`);
    throw new Error(err.message);
  }
}

async function launchInstance(amiId, keyPairName, instanceType, securityGroupId, subnetId) {
  const params = {
    ImageId: amiId,
    KeyName: keyPairName,
    InstanceType: instanceType,
    SecurityGroupIds: [ securityGroupId ],
    SubnetId: subnetId,
    MinCount: 1,
    MaxCount: 1,
    TagSpecifications: [
      { Key: 'Name', Value: 'temp-vm-spun-up-from-nodejs' }
    ]
  };

  const command = new RunInstancesCommand(params);
  try {
    const launchInstancesData = await executeCommand(command);
    return launchInstancesData.Instances[0];
  } catch (err) {
    console.error(`ERROR: launchInstance: Could not launch instance ${ err.message }`);
    throw new Error(err.message);
  }

}

async function getInstanceStatus(instanceId) {
  const params = {
    InstanceIds: [ instanceId ]
  };

  const command = new DescribeInstanceStatusCommand(params);
  try {
    const instanceStatusData = await executeCommand(command);
    return instanceStatusData.InstanceStatuses.length > 0? instanceStatusData.InstanceStatuses[0].InstanceState : null;
  } catch (err) {
    console.error(`ERROR: getInstanceStatus: could not obtain status for ${ instanceId }`);
    throw new Error(err.message);
  }
}

async function sleep(millis) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve();
    }, millis);
  });
}

async function waitUntilInstanceRunning(instanceId) {
  const instanceStatus = await getInstanceStatus(instanceId);
  if (instanceStatus && instanceStatus.Name === 'running') {
    return;
  } else {
    console.log(`INFO: waitUntilInstanceRunning: ${ instanceId } is not yet running: waiting for 15 seconds`);
    await sleep(15000);
    await waitUntilInstanceRunning(instanceId);
  }
}

async function getInstanceInfo(instanceId) {
  const params = {
    InstanceIds: [ instanceId ]
  };

  const command = new DescribeInstancesCommand(params);
  try {
    const instanceData = await executeCommand(command);
    return instanceData.Reservations[0].Instances[0];
  } catch (err) {
    console.error(`ERROR: getInstanceInfo: could not obtain instanceInfo for ${ instanceId }`);
    throw new Error(err.message);
  }
}

async function terminateInstance(instanceId) {
  const params = {
    InstanceIds: [ instanceId ]
  };

  const command = new TerminateInstancesCommand(params);
  try {
    const instanceData = await executeCommand(command);
    return instanceData.TerminatingInstances[0];
  } catch (err) {
    console.error(`ERROR: getInstanceInfo: could not obtain instanceInfo for ${ instanceId }`);
    throw new Error(err.message);
  }
}


async function waitUntilInstanceTerminated(instanceId) {
  const instanceInfo = await getInstanceInfo(instanceId);
  if (instanceInfo && instanceInfo.State.Name === 'terminated') {
    return;
  } else {
    console.log(`INFO: waitUntilInstanceTerminated: ${ instanceId } is not yet terminated: waiting for 15 seconds`);
    await sleep(15000);
    await waitUntilInstanceTerminated(instanceId);
  }
}

async function executeCommand(command) {
  try {
    return ec2Client.send(command);
  } catch (err) {
    console.error(`ERROR: executeCommand: ${ err.message }`);
    throw err;
  }
}

async function readStdin() {
  return new Promise(resolve => {
    const rl = readline.createInterface({ input: process.stdin, output: process.stdout });

    rl.question(`Press [ENTER] to terminate instance:`, userInput => {
      resolve(userInput);
      rl.close();
    });
  });
}


async function main() {
  // As of 2021-02-28 this image name brought the Amazon AMI you get on AWS console
  const IMAGE_NAME_PATTERN = 'amzn2-ami-hvm-2.0.20210219.*-x86_64-gp2';
  const { ImageId, Name } = await getImageData(IMAGE_NAME_PATTERN);
  console.log(`INFO: main: imageID=${ ImageId } (name='${ Name }')`);

  const { VpcId } = await getDefaultVPC();
  console.log(`INFO: main: default VPC ID=${ VpcId }`);

  const { SubnetId } = await getFirstSubnet(VpcId);
  console.log(`INFO: main: subnet ID=${ SubnetId }`);

  let { GroupId } = await getSecurityGroup(VpcId);
  if (GroupId) {
    console.log(`WARN: main: security group already exist: deleting`);
    await deleteSecurityGroup(GroupId);
    console.log(`INFO: main: successfully deleted pre-existing security group`);
  }

  ({ GroupId } = await createSecurityGroup(VpcId));
  console.log(`INFO: main: created security group with id=${ GroupId }`);

  await openSSH(GroupId);
  console.log(`INFO: main: created ingress rule to open SSH to the world`);

  const exists = await validateKeyPairExist(keyPairName);
  if (!exists) {
    console.error(`ERROR: main: the key '${ keyPairName }' does not exist`);
    throw new Error('Provided Key Pair does not exist');
  } else {
    console.log(`INFO: main: will use key pair '${ keyPairName }'`);
  }

  const { InstanceId, State } = await launchInstance(ImageId, keyPairName, 't2.micro', GroupId, SubnetId);
  console.log(`INFO: main: launching instance ${ InstanceId }: current State: ${ State.Name }`);

  await waitUntilInstanceRunning(InstanceId);
  console.log(`INFO: main: instance ${ InstanceId } is running`);

  const { PublicDnsName } = await getInstanceInfo(InstanceId);
  console.log(`Type:
  ssh -i ~/.ssh/${ keyPairName }.pem ec2-user@${ PublicDnsName }`);

  await readStdin();

  await terminateInstance(InstanceId);
  console.log(`INFO: main: termination signal for instance ${ InstanceId } has been sent`);

  await waitUntilInstanceTerminated(InstanceId);

  await deleteSecurityGroup(GroupId);
  console.log(`INFO: main: security group ${ InstanceId } has been deleted`);
}

main()
  .then(() => console.log('INFO: main: done!'))
  .catch((err) => console.error(`ERROR: main: ${ err.message }`));
