import { AuthorizeSecurityGroupIngressCommand, AuthorizeSecurityGroupIngressCommandInput, CreateSecurityGroupCommand, CreateSecurityGroupCommandInput, CreateSecurityGroupCommandOutput, CreateTagsCommand, CreateTagsCommandInput, DeleteSecurityGroupCommand, DeleteSecurityGroupCommandInput, DescribeImagesCommand, DescribeImagesCommandInput, DescribeInstancesCommand, DescribeInstancesCommandInput, DescribeInstanceStatusCommand, DescribeInstanceStatusCommandInput, DescribeKeyPairsCommand, DescribeKeyPairsCommandInput, DescribeSecurityGroupsCommand, DescribeSecurityGroupsCommandInput, DescribeSubnetsCommand, DescribeSubnetsCommandInput, DescribeVpcsCommand, DescribeVpcsCommandInput, EC2Client, Image, Instance, InstanceStateChange, InstanceStatus, KeyPairInfo, RunInstancesCommand, RunInstancesCommandInput, SecurityGroup, Subnet, TerminateInstancesCommand, TerminateInstancesCommandInput, Vpc } from '@aws-sdk/client-ec2';
import { fromIni } from '@aws-sdk/credential-provider-ini';
import superagent from 'superagent';
// import { promises as readlinePromises } from 'readline'; // not available yet in TS?
import readline from 'readline';

let commandLineArgs: string[];
if (process.argv.length > 2) {
  commandLineArgs = process.argv.slice(2);
} else {
  console.error(`ERROR: Usage npm start {key-pair-name} [{profile}]`);
  process.exit(1);
}

const [keyPairName, profileName] = commandLineArgs;

const ec2Client = profileName ?
  new EC2Client({
    region: 'us-east-1',
    credentials: fromIni({ profile: profileName })
  })
  : new EC2Client({
    region: 'us-east-1'
  });

async function getImageData(imageNamePattern: string): Promise<Image> {
  const params: DescribeImagesCommandInput = {
    Filters: [
      { Name: 'name', Values: [ imageNamePattern ] }
    ]
  };

  const command = new DescribeImagesCommand(params);
  try {
    const imageData = await ec2Client.send(command);

    if (imageData.Images?.length && imageData.Images?.length > 0) {
      return imageData.Images[0];
    } else {
      throw new Error(`No images matching '${ imageNamePattern }'`);
    }
  } catch (err) {
    console.error(`ERROR: getImageData: Could not obtain imageData for '${ imageNamePattern }': ${ (err as Error).message }`);
    throw err;
  }
}

async function getDefaultVPC(): Promise<Vpc> {
  const params: DescribeVpcsCommandInput = {
    Filters: [
      { Name: 'isDefault', Values: [ 'true' ] }
    ]
  };
  const command = new DescribeVpcsCommand(params);
  try {
    const vpcData = await ec2Client.send(command);
    if (vpcData.Vpcs?.length && vpcData.Vpcs?.length > 0) {
      return vpcData.Vpcs[0];
    } else {
      throw new Error(`Could not find default VPC`);
    }
  } catch (err) {
    console.error(`ERROR: getDefaultVPC: Could not obtain default VPC info: ${ (err as Error).message }`);
    throw err;
  }
}

async function getFirstSubnet(vpcId: string): Promise<Subnet> {
  const params: DescribeSubnetsCommandInput = {
    Filters: [
      { Name: 'vpc-id', Values: [ vpcId ] }
    ],
    MaxResults: 5 // a value >= 5 is expected
  };

  const command = new DescribeSubnetsCommand(params);

  try {
    const subnetsData = await ec2Client.send(command);
    if (subnetsData.Subnets?.length && subnetsData.Subnets.length > 0) {
      return subnetsData.Subnets[0];
    } else {
      throw new Error(`Could not find the first subnet in the VPC ${ vpcId }`);
    }
  } catch (err) {
    console.error(`ERROR: getFirstSubnet(): could not obtain first subnet of ${ vpcId }: ${ (err as Error).message }`);
    throw err;
  }
}

async function getSecurityGroup(vpcId: string): Promise<SecurityGroup> {
  const params: DescribeSecurityGroupsCommandInput = {
    Filters: [
      { Name: 'description', Values: [ 'Temporary security group created from Node.js'] },
      { Name: 'group-name', Values: [ 'temp-security-group-nodejs' ] },
      { Name: 'vpc-id', Values: [ vpcId ] }
    ]
  };

  const command = new DescribeSecurityGroupsCommand(params);
  try {
    const sgData = await ec2Client.send(command);
    return (sgData.SecurityGroups?.length && sgData.SecurityGroups?.length > 0) ? { GroupId: sgData.SecurityGroups[0].GroupId } : { GroupId: undefined };
  } catch (err) {
    console.error(`ERROR: getSecurityGroup: Could not obtain info about security group: ${ (err as Error).message }`);
    throw err;
  }
}

async function deleteSecurityGroup(groupId: string) {
  const params: DeleteSecurityGroupCommandInput = {
    GroupId: groupId
  };

  const command = new DeleteSecurityGroupCommand(params);

  try {
    await ec2Client.send(command);
  } catch (err) {
    console.error(`ERROR: deleteSecurityGroup: could not delete security group id ${ groupId }`);
    throw err;
  }
}

async function createSecurityGroup(vpcId: string): Promise<CreateSecurityGroupCommandOutput> {
  const params: CreateSecurityGroupCommandInput = {
    Description: 'Temporary security group created from Node.js',
    GroupName: 'temp-security-group-nodejs',
    VpcId: vpcId
  };

  const command = new CreateSecurityGroupCommand(params);

  try {
    const sgData = await ec2Client.send(command);
    return sgData;
  } catch (err) {
    console.error(`ERROR: createSecurityGroup: could not create security group on VPC ${ vpcId }: ${ (err as Error).message }`);
    throw err;
  }
}

async function getMyPublicIpAddress(): Promise<string> {
  try {
    const res = await superagent
    .get('https://api64.ipify.org')
    .query('format=json');

    const ipAddress = res.body.ip;
    console.log(`INFO: getMyPublicIpAddress: your ip address is ${ ipAddress }`);
    return ipAddress;
  } catch (err) {
    console.error(`ERROR: getMyPublicIpAddress: ${ (err as Error).message }`);
    throw err;
  }
}

async function configureSgRules(securityGroupId: string) {
  const myIpAddress = await getMyPublicIpAddress();

  const params: AuthorizeSecurityGroupIngressCommandInput = {
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
    await ec2Client.send(command);
  } catch (err) {
    console.error(`ERROR: configureSgRules: could not configure security rules for sg ${ securityGroupId }: ${ (err as Error).message }`);
    throw err;
  }
}

async function validateKeyPairExists(keyPairName: string) {
  // just for fun, we don't filter on the AWS side, but in code!
  const params: DescribeKeyPairsCommandInput = {};
  const command = new DescribeKeyPairsCommand(params);

  try {
    const keyPairs = await ec2Client.send(command);
    const keyPairNameMatches = (keyPair: KeyPairInfo) => keyPair.KeyName === keyPairName;
    const exists = keyPairs.KeyPairs?.some(keyPairNameMatches);
    return exists;
  } catch (err) {
    console.error(`ERROR: validateKeyPairExists: could not validate if key pair '${ keyPairName }' exists: ${ (err as Error).message }`);
    throw err;
  }
}

interface LaunchInstanceData {
  amiId: string;
  keyPairName: string;
  instanceType: string;
  securityGroupId: string;
  subnetId: string;
}

async function launchInstance(instanceData: LaunchInstanceData): Promise<Instance> {

  const params: RunInstancesCommandInput = {
    ImageId: instanceData.amiId,
    KeyName: instanceData.keyPairName,
    InstanceType: instanceData.instanceType,
    SecurityGroupIds: [ instanceData.securityGroupId ],
    SubnetId: instanceData.subnetId,
    MinCount: 1,
    MaxCount: 1,
    TagSpecifications:
    [
      {
        ResourceType: 'instance',
        Tags: [{ Key: 'owner', Value: 'nodejs' }]
      }
    ]
  };

  const command = new RunInstancesCommand(params);
  try {
    const launchInstancesData = await ec2Client.send(command);
    if (launchInstancesData.Instances && launchInstancesData.Instances.length > 0) {
      return launchInstancesData.Instances[0];
    } else {
      throw new Error('Unexpected response from RunInstancesCommand');
    }
  } catch (err) {
    console.error(`ERROR: launchInstance: Could not launch instance: ${ (err as Error).message }`);
    throw err;
  }
}

async function tagLaunchedInstance(instanceId: string) {
  const params: CreateTagsCommandInput = {
    Resources: [ instanceId ],
    Tags: [
      { Key: 'Name', Value: 'temp-vm-launched-from-nodejs' }
    ]
  };

  try {
    const command = new CreateTagsCommand(params);
    await ec2Client.send(command);
  } catch (err) {
    console.error(`ERROR: tagLaunchedInstance: Could not tag launched instane: ${ (err as Error).message }`);
    throw err;
  }
}

async function getInstanceStatus(instanceId: string): Promise<InstanceStatus> {
  const params: DescribeInstanceStatusCommandInput = {
    InstanceIds: [ instanceId ],
    IncludeAllInstances: true
  };

  const command = new DescribeInstanceStatusCommand(params);
  try {
    const instanceStatusData = await ec2Client.send(command);
    if (instanceStatusData.InstanceStatuses) {
      return instanceStatusData.InstanceStatuses[0];
    } else {
      throw new Error(`Unexpected response from DescribeInstanceStatusCommand for ${ instanceId }`);
    }
  } catch (err) {
    console.error(`ERROR: getInstanceStatus: could not read instance status of ${ instanceId }: ${ (err as Error).message }`);
    throw err;
  }
}

async function sleep(millis: number) {
  return new Promise<void>((resolve) => {
    setTimeout(() => {
      resolve();
    }, millis);
  });
}

async function waitUntilInstanceRunning(instanceId: string, isFirstTime: boolean = true): Promise<void> {
  const instanceStatus = await getInstanceStatus(instanceId);
  if (instanceStatus && instanceStatus.InstanceState?.Name === 'running') {
    return;
  } else {
    console.log(`INFO: waitUntilInstanceRunning: ${ instanceId } not yet running: waiting for ${ isFirstTime? '': 'another ' }15 seconds`);
    await sleep(15_000);
    await waitUntilInstanceRunning(instanceId, false);
  }
}


async function getInstanceInfo(instanceId: string): Promise<Instance> {
  const params: DescribeInstancesCommandInput = {
    InstanceIds: [ instanceId ]
  };

  const command = new DescribeInstancesCommand(params);
  try {
    const instanceData = await ec2Client.send(command);
    if (instanceData.Reservations && instanceData.Reservations[0] && instanceData.Reservations[0].Instances) {
      return instanceData.Reservations[0].Instances[0];
    } else {
      throw new Error(`Unexpected response rom DescribeInstancesCommand`);
    }
  } catch (err) {
    console.error(`ERROR: getInstanceInfo: could not read instance info for ${ instanceId }`);
    throw err;
  }
}


async function readStdin(): Promise<string> {
  return new Promise(resolve => {
    const rl = readline.createInterface({ input: process.stdin, output: process.stdout });
    rl.question(`Press [ENTER] to terminate instance:`, userInput => {
      resolve(userInput);
      rl.close();
    });
  });
}

async function terminateInstance(instanceId: string): Promise<InstanceStateChange> {
  const params: TerminateInstancesCommandInput = {
    InstanceIds: [ instanceId ]
  };

  const command = new TerminateInstancesCommand(params);
  try {
    const instanceData = await ec2Client.send(command);
    if (instanceData.TerminatingInstances && instanceData.TerminatingInstances[0]) {
      return instanceData.TerminatingInstances[0];
    } else {
      throw new Error(`Unexpected response from TerminateInstancesCommand`);
    }
  } catch (err) {
    console.error(`ERROR: terminateInstance: could not terminate ${ instanceId }`);
    throw err;
  }
}

async function waitUntilInstanceTerminated(instanceId: string, isFirstTime: boolean = true): Promise<void> {
  const instanceStatus = await getInstanceStatus(instanceId);
  if (instanceStatus && instanceStatus.InstanceState?.Name === 'terminated') {
    return;
  } else {
    console.log(`INFO: waitUntilInstanceTerminated: ${ instanceId } not yet terminated: waiting for ${ isFirstTime? '': 'another ' }15 seconds`);
    await sleep(15_000);
    await waitUntilInstanceTerminated(instanceId, false);
  }
}

async function main() {
  /* as of 2021-11-13, the following pattern brings the default Amazon AMI you get in the console */

  const IMAGE_NAME_PATTERN = 'amzn2-ami-kernel-5.10-hvm-2.0.20211103.*-x86_64-gp2';
  const { ImageId, Name } = await getImageData(IMAGE_NAME_PATTERN);
  if (!ImageId) {
    console.error(`ERROR: main: could not find Image ID for pattern ${ IMAGE_NAME_PATTERN }`);
    throw new Error('ImageId not found');
  }
  console.log(`INFO: main: imageID=${ ImageId } (name='${ Name }')`);

  const { VpcId } = await getDefaultVPC();
  if (VpcId) {
    console.log(`INFO: main: default VPC ID=${ VpcId }`);
  } else {
    console.error(`ERROR: main: empty VPC ID`);
    throw new Error(`Default VPC is empty`);
  }

  const { SubnetId } = await getFirstSubnet(VpcId);
  if (!SubnetId) {
    console.error(`ERROR: main: empty subnetId for ${ VpcId }`);
    throw new Error(`First subnet of ${ VpcId} not found`);
  }
  console.log(`INFO: main: Subnet ID=${ SubnetId }`);

  let { GroupId } = await getSecurityGroup(VpcId);
  if (GroupId) {
    console.log(`WARN: main: security group already exists: deleting...`);
    await deleteSecurityGroup(GroupId);
  }

  ({ GroupId } = await createSecurityGroup(VpcId));
  if (!GroupId) {
    console.log(`ERROR: main: could not create security group: it is empty`);
    throw new Error('Empty security group');
  } else {
    console.log(`INFO: main: created security group with id=${ GroupId }`);
  }

  await configureSgRules(GroupId);
  console.log(`INFO: main: created ingress rule to open SSH to your public IP address`);

  const exists = await validateKeyPairExists(keyPairName);
  if (!exists) {
    console.error(`ERROR: main: the provided key ${ keyPairName } does not exist`);
    throw new Error(`Provided key pair does not exist`);
  } else {
    console.log(`INFO: main: instance will be configured with key pair '${ keyPairName }'`);
  }

  const { InstanceId, State } = await launchInstance({ amiId: ImageId, keyPairName, instanceType: 't2.micro', securityGroupId: GroupId, subnetId: SubnetId });
  if (!InstanceId) {
    console.error(`ERROR: main: unexpected response when launching instance`);
    throw new Error(`InstanceId was empty`);
  }
  console.log(`INFO: main: launching instance ${ InstanceId }: current state: ${ State?.Name }`);

  await tagLaunchedInstance(InstanceId);
  console.log(`INFO: main: tagging instance ${ InstanceId }`);

  await waitUntilInstanceRunning(InstanceId);
  console.log(`INFO: main: instance ${ InstanceId } is running!`);

  const { PublicDnsName } = await getInstanceInfo(InstanceId);
  if (!PublicDnsName) {
    console.error(`ERROR: main: PublicDnsName was empty for ${ InstanceId }`);
    throw new Error(`PublicDnsName was empty for launched instance`);
  }
  console.log(`Login in the instance typing:
  ssh -i ~/.ssh/${ keyPairName }.pem ec2-user@${ PublicDnsName }`);

  await readStdin();
  console.log(`INFO: main: about to terminate instance ${ InstanceId }`);

  await terminateInstance(InstanceId);
  console.log(`INFO: main: termination signal for instance ${ InstanceId } has been sent`);

  await waitUntilInstanceTerminated(InstanceId);

  await deleteSecurityGroup(GroupId);
  console.log(`INFO: main: sececurity group ${ GroupId } has been deleted`);
}

main()
  .then(() => console.log(`INFO: done!`))
  .catch((err) => console.error(`ERROR: ${ (err as Error).message }`));
