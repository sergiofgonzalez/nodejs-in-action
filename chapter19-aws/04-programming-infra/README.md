# Chapter 19 &mdash; Interacting with Amazon Web Services
## Section 4: Programming your infrastructure
> interacting programmatically with *AWS*

### Summary
+ Introducing the different ways to interact programmatically with AWS
+ Infrastructure-as-Code (IaC)
+ Basics of `aws` CLI tools
+ Basics of AWS SDKs: JavaScript V3 SDK
+ Basics of *AWS CloudFormation*

### Intro

AWS provides an API that control every part of AWS over HTTP. As this options requires a lot of repititive work, ant it is very low-level, AWS offers several tools on top of the HTTP API to facilitate the job of interacting with AWS programmatically:

+ Command-line interface (CLI) &mdash; that allows you to interact with AWS from your terminal and shell scripts.

+ Software development kits (SDKs) &mdash; that allows you to use your favorite programming language to make calls to AWS services.

+ *AWS CLoudFormation* &mdash; that lets you to describe the state of the infrastructure in terms of artifacts called *templates* and use the *AWS CloudFormation* service to translate those *templates* into API calls.


### Infrastructure as Code (IaC)

*Infrastructure as Code* is the idea of using a high-level programming language to control cloud resources (such as VMs, networks, DNS entries).

This approach will let you use current trends such as *DevOps* and their ecosystem of tools to automate the provisioning of infrastructure, and applying the same set of quality guidelines that would apply to traditional software development.

### Using the CLI

The *AWS CLI* is a convenient way to use AWS from your terminal. It provides a unified interface for all AWS services across different operating systems.

| NOTE: |
| :---- |
| To install/update the *AWS CLI* follow the instructions in https://docs.aws.amazon.com/cli/latest/userguide/install-cliv2.html.<br>Once installed, you can configure autocompletion in your shell by following the instructions on https://docs.aws.amazon.com/cli/latest/userguide/cli-configure-completion.html. |


To use the CLI, you need to specify a service and an action using the syntax:

```bash
aws [--profile {profile-name}] {service} {action} [--key value ...]
```

In order to obtain help you should type:

+ `aws help` &mdash; for general help on the `aws` command.
+ `aws {service} help` &mdash; to obtain help on a particular *AWS service*.
+ `aws {service} {action} help` &mdash; to obtain help on a particular action for an *AWS service*.

### Programming with the SDK
AWS offers SDKs for a number of programming languages and platforms. Those SDK facilitate the interaction with AWS by taking care of things such as HTTP communication, result serialization, authentication, etc.

The main page for all things relates to AWS SDK is: https://aws.amazon.com/tools/.

Most of the examples in this section are written in Node.js. You can find all the related information here: https://docs.aws.amazon.com/sdk-for-javascript/v3/developer-guide/getting-started-nodejs.html. As of March 1, 2021, the AWS SDK for JavaScript V3 is the latest release and provides quite a different approach to interact with AWS resources from the one used for the previous version of the SDK.

You can find the details in the following links:

+ [Developer's Guide](https://docs.aws.amazon.com/sdk-for-javascript/v3/developer-guide/welcome.html) &mdash; General information about the AWS SDK for JavaScript v3

+ [First steps into AWS SDK v3](https://docs.aws.amazon.com/sdk-for-javascript/v3/developer-guide/getting-started-nodejs.html) &mdash; A step-by-step guide to a basic example to get you started with the new V3 API.

+ [Authentication with AWS SDK v3](https://docs.aws.amazon.com/credref/latest/refdocs/overview.html) &mdash; article explaining how to authenticate with the new V3 API.

+ [AWS SDK v3 reference](https://docs.aws.amazon.com/AWSJavaScriptSDK/v3/latest/) &mdash; main reference page, with all the available *clients* that represent the executor objects for the different resources. For example, the [`@aws-sdk/client-ec2`](https://docs.aws.amazon.com/AWSJavaScriptSDK/v3/latest/clients/client-ec2/index.html) is the one used to interact with *EC2 service* resources.

+ [AWS SDK v3 examples](https://github.com/awsdocs/aws-doc-sdk-examples/tree/master/javascriptv3/example_code) &mdash; GitHub repository with examples using the AWS SDK v3 for JavaScript.

### *AWS CloudFormation*: using a blueprint to start a VM
*AWS CloudFormation* is based on artifacts that describe the infrastructure and that let you automate its creation, update, or deletion. Those artifacts are called *templates*.

A template is nothing more than a description of the different resources of your solution written in JSON or YAML in a way that can be interpreted by *CloudFormation*.

| NOTE: |
| :---- |
| The approach taken for *CloudFormation* is declarative: you tell *CloudFormation* how your infrastructure should look, rather than how to create it. |

There are several added benefits when using *CloudFormation*:

+ Consistent way to define the infrastructure on AWS &mdash; when using shell scripts/SDK different developers might decide to create the infrastructure differently. With *CloudFormation* there is only one way.

+ Robust dependency management &mdash; *CloudFormation* provides a robust handling of dependencies between resources (e.g. web server depending on a Load Balancer).

+ Replicability &mdash; once created, a *CloudFormation* template can be used two clone infrastructure across different environments.

+ Robust Configurability &mdash; *CloudFormation* allows you to use parameters to custimize the aspects of the template that might change.

+ Updatibility/Upgradeability &mdash; *CloudFormation* supports updates to your infrastructure. The engine will be responsible to identify the parts that have changed and apply the changes as smoothly as possible.

+ It's *Infrastructure-as-Code (IaC)* &mdash; A *CloudFormation* template is a JSON or YAML document that can be stored in a Git repository and used to document the current status of your infrastructure.

#### Anatomy of a CloudFormation Template

A *CloudFormation* template is structured into five parts:

1. Format version &mdash; version specification of the template.
2. Description &mdash; free text describing the template.
3. Parameters &mdash; the variables used in your template.
4. Resources &mdash; the *AWS resources* of your infrastructure.
5. Outputs &mdash; an output is a parameter that is returned from your template, such as the public DNS name of an EC2 instance.

The following is a succinct example of a *CloudFormation* template:

```YAML
AWSTemplateFormatVersion: '2010-09-09'

Description: 'CloudFormation template structure'

Parameters:
  param1:
    Type: Number
    Description: 'param1 is an example of a numeric parameter'
  # ... parameters ...

Resources:
  # ... resources ...

Outputs:
 # ... outputs ...
```

##### Parameters

A parameter specification has at least a name and a type:

```YAML
Parameters:
  param1:
    Type: Number
    Description: 'param1 is an example of a numeric parameter'
```

The following table lists the valid parameter types:

| Parameter Type | Description |
| :------------- | :---------- |
| String<br>CommaDelimitedList | A string or list of strings separated by commas. |
| Number<br>List<Number> | An integer or float, or a list of integers or floats. |
| AWS::EC2::AvailabilityZone::Name<br>List<AWS::EC2::AvailabilityZone::Name> | An *Availability Zone* (`us-east-1a`) or a list of *Availability Zones*. |
| AWS::EC2::Image::Id<br>List<AWS::EC2::Image::Id> | An *AMI ID* or a list of *AMIs*. |
| AWS::EC2::Instance::Id<br>List<AWS::EC2::Instance::Id> | An *EC2* instance ID or a list of *EC2* instance IDs. |
| AWS::EC2::KeyPair::KeyName | An Amazon EC2 key-pair name. |
| AWS::EC2::SecurityGroup::Id<br>List<AWS::EC2::SecurityGroup::Id> | A *Security Group ID* or a list of *Security Group IDs*. |
| AWS::EC2::Subnet::Id<br>List<AWS::EC2::Subnet::Id> | A *subnet ID* or a list of *subnet IDs*. |
| AWS::EC2::Volume::Id<br>List<AWS::EC2::Volume::Id> | An *EBS Volume ID* or a list of *EBS Volume IDs*. |
| AWS::EC2::VPC::Id<br>List<AWS::EC2::VPC::Id> | A *VPC ID* or a list of *VPC IDs*. |
| AWS::Route53::HostedZone::Id<br>List<AWS::Route53::HostedZone::Id> | A *DNS zone ID* or a list of *DNS zone IDs*. |

A parameter can be enhanced with the following properties:

| Property | Description | Example |
| :------- | :---------- | :------ |
| Default  | A default value for the parameter | `Default: 'm5.large'` |
| NoEcho   | Hides the parameter value in graphical tools (for PII info) | `NoEcho: true |
| AllowedValues | Specifies possible values for a parameter | `AllowedValues: [1, 2, 3]` |
| AllowedPattern | Specifies a regex for the possible values of a parameters | `AllowedPattern: '[A-Za-z0-9]*` |
| MinLength | Defines the min length of a parameter | `MinLength: 5` |
| MaxLength | Defines the max length of a parameter | `MaxLength: 5` |
| MinValue | Used in combination with the `Number` type to define the min value for a parameter | `MinValue: 100` |
| MaxValue | Used in combination with the `Number` type to define the max value for a parameter | `MaxValue: 1000` |
| ConstraintDescription | A string to show to the user when the constraint is violated | `ConstraintDescription: 'Maximum value of the parameter is 1000'` |


The following snippet is a parameter section of a *CloudFormation template*:

```YAML
Parameters:
  KeyName:
    Description: 'Key Pair Name'
    Type: 'AWS::EC2::KeyPair::KeyName'
  NumberOfVirtualMachines:
    Description: 'Number of VMs to spin up'
    Type: Number
    Default: 1
    MinValue: 1
    MaxValue: 5
  WordPressVersion:
    Description: 'Version of WordPress to install'
    Type: String
    AllowedValues: ['4.1.1', '4.0.1']
```

| NOTE: |
| :---- |
| You can find all the documentation about the parameters in https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/parameters-section-structure.html. |

##### Resources

A resource is identified by a name, a type and some additional properties. Those properties vary from resource type to resource type.

For example, the following snippet declares an EC2 Instance:

```YAML
Resources:
  VM:
    Type: 'AWS::EC2::Instance'
    Properties:
      ImageId: 'ami-0915bcb5fa77e4892'
      InstanceType: 't2.micro'
      KeyName: mykey
      NetworkInterfaces:
        - AssociatePublicIpAddress: true
          DeleteOnTermination: true
          DeviceIndex: 0
          GroupSet:
            - 'sg-55555'
          SubnetId:
            - 'subnet-555555'
```

##### Outputs

An output is identified by at least a name and a value. You're encouraged to also include a description.

The output can then be used to pass data from the template to its outside:

```YAML
Outputs:
  NameOfOutput:
    Value: 1
    Description: 'This output is always 1'
```

The snippet before is a *static output* which is not very useful per se. Typically, you would find *outputs* like the ones below that reference the names or attributes of some of the resources declared in the template.

| NOTE: |
| :---- |
| The syntax `!Ref Name` is used to reference parameters and resources, while `!GetAtt 'Resource.attr'` is used to reference attributes of resources. |

```YAML
Outputs:
  ID:
    Value: !Ref Server
    Description: 'ID of the EC2 instance'
  PublicName:
    Value: !GetAtt 'Server.PublicDnsName'
    Description: 'Public name of the EC2 instance'
```


#### Creating your first template

The following *CloudFormation template* creates a an *EC2 instance*.

```yaml
---
AWSTemplateFormatVersion: '2010-09-09'
Description: 'Spin up EC2 instance'
Parameters:
  KeyName:
    Description: 'Key Pair name'
    Type: 'AWS::EC2::KeyPair::KeyName'
  VPC:
    Description: 'VPC on which the VM will be placed'
    Type: 'AWS::EC2::VPC::Id'
  Subnet:
    Description: 'Subnet on which the VM will be placed'
    Type: 'AWS::EC2::Subnet::Id'
  InstanceType:
    Description: 'Select one instance type from the list'
    Type: String
    Default: 't2.micro'
    AllowedValues: ['t2.micro', 't2.small', 't2.medium']

Mappings:
  RegionMap:  # used to map region with the AmazonLinux image in that region
    # Including only three regions for the purpose of demonstrating mappings
    'us-east-1':
      AMI: 'ami-0915bcb5fa77e4892'

    'eu-central-1':
      AMI: 'ami-02f9ea74050d6f812'

    'ap-southeast-1':
      AMI: 'ami-0d06583a13678c938'

Resources:
  SecurityGroup:
    Type: 'AWS::EC2::SecurityGroup'
    Properties:
      GroupDescription: 'Security Group for the VM'
      VpcId: !Ref VPC
      SecurityGroupIngress:
        - CidrIp: '0.0.0.0/0' # open to the world
          IpProtocol: tcp
          FromPort: 22
          ToPort: 22

  VM:
    Type: 'AWS::EC2::Instance'
    Properties:
      ImageId: !FindInMap [RegionMap, !Ref 'AWS::Region', AMI] # get the AMI from the Region Map
      InstanceType: !Ref InstanceType
      KeyName: !Ref KeyName
      SecurityGroupIds: [!Ref SecurityGroup]
      SubnetId: !Ref Subnet

Outputs:
  PublicName:
    Value: !GetAtt 'VM.PublicDnsName'
    Description: 'Public DNS Name of the server to connect via SSH as user ec2-user'
```

If you create an infrastructure from a template, *CloudFormation* calls it a *stack*. You can think of a *template* vs. *stack* much like you think about Docker images and running containers: while the *template* exists only once, many *stacks* can be created from the same *template*.

### Labs

#### Lab 4.1: Create an *AWS CLI* user

To use the CLI, you need to authenticate through an *access key* and *secret access key* that will be bound to a user.

To create a new user and attach to it those access and secret access key you need to:

1. Navigate to the *IAM service* page.

2. Click on *Users* in the submenu.

3. Click on *Add User*.

4. Enter a user name that identifies it as a *CLI* user, such as `cli_user` or similar.

5. Select programmatic access.

6. In the permissions sections, select *Attach existing policies directly* and check *AdministratorAccess*. ![Admin Access](images/cli_admin.png)

7. Review the details and click on *Create User*.

8. Run `aws configure` if it is the first time that you run the *AWS CLI* or alternatively, run `aws --profile {profile-name} configure`  so that the *access key* and *secret access key* get correctly configured in the corresponding `~/.aws/credentials` and the configuration gets written into the `~/.aws/config` files.
9. (Optional) If you are configuring a different profile than the default one, you might also consider configuring the `~/.aws/config` file with your default *AWS Region* and output format:

9. Run a command to validate everything is configured correctly:

```bash
$ bash aws [--profile {profile-n}] --region us-east-1 ec2 describe-regions
s --profile awsia ec2 --region us-east-1 describe-regions
{
    "Regions": [
        {
            "Endpoint": "ec2.eu-north-1.amazonaws.com",
            "RegionName": "eu-north-1",
            "OptInStatus": "opt-in-not-required"
        },
        {
            "Endpoint": "ec2.ap-south-1.amazonaws.com",
            "RegionName": "ap-south-1",
            "OptInStatus": "opt-in-not-required"
        },
        {
            "Endpoint": "ec2.eu-west-3.amazonaws.com",
            "RegionName": "eu-west-3",
            "OptInStatus": "opt-in-not-required"
        },
        {
            "Endpoint": "ec2.eu-west-2.amazonaws.com",
            "RegionName": "eu-west-2",
            "OptInStatus": "opt-in-not-required"
        },
        {
            "Endpoint": "ec2.eu-west-1.amazonaws.com",
            "RegionName": "eu-west-1",
            "OptInStatus": "opt-in-not-required"
        },
        {
            "Endpoint": "ec2.ap-northeast-2.amazonaws.com",
            "RegionName": "ap-northeast-2",
            "OptInStatus": "opt-in-not-required"
        },
        {
            "Endpoint": "ec2.ap-northeast-1.amazonaws.com",
            "RegionName": "ap-northeast-1",
            "OptInStatus": "opt-in-not-required"
        },
        {
            "Endpoint": "ec2.sa-east-1.amazonaws.com",
            "RegionName": "sa-east-1",
            "OptInStatus": "opt-in-not-required"
        },
        {
            "Endpoint": "ec2.ca-central-1.amazonaws.com",
            "RegionName": "ca-central-1",
            "OptInStatus": "opt-in-not-required"
        },
        {
            "Endpoint": "ec2.ap-southeast-1.amazonaws.com",
            "RegionName": "ap-southeast-1",
            "OptInStatus": "opt-in-not-required"
        },
        {
            "Endpoint": "ec2.ap-southeast-2.amazonaws.com",
            "RegionName": "ap-southeast-2",
            "OptInStatus": "opt-in-not-required"
        },
        {
            "Endpoint": "ec2.eu-central-1.amazonaws.com",
            "RegionName": "eu-central-1",
            "OptInStatus": "opt-in-not-required"
        },
        {
            "Endpoint": "ec2.us-east-1.amazonaws.com",
            "RegionName": "us-east-1",
            "OptInStatus": "opt-in-not-required"
        },
        {
            "Endpoint": "ec2.us-east-2.amazonaws.com",
            "RegionName": "us-east-2",
            "OptInStatus": "opt-in-not-required"
        },
        {
            "Endpoint": "ec2.us-west-1.amazonaws.com",
            "RegionName": "us-west-1",
            "OptInStatus": "opt-in-not-required"
        },
        {
            "Endpoint": "ec2.us-west-2.amazonaws.com",
            "RegionName": "us-west-2",
            "OptInStatus": "opt-in-not-required"
        }
    ]
}
```

#### Labs 4.2: CLI: using `--filters`

The following lab illustrates how to list all running EC2 instances of type *t2.micro* using `--filters`.

Run the following command:

```bash
$ aws ec2 \
describe-instances \
--filters "Name=instance-type,Values=t2.micro"
{
    "Reservations": []
}
```

#### Labs 4.3: CLI: using `--query`

The following lab illustrates how to extract a particular value from the JSON output of a CLI command using `--query` (which uses the JMESPath syntax).

For example, to obtain the first ImageID returned by the command `aws ec2 describe-images` you would do:

```bash
$ aws ec2 describe-images --query "Images[0].ImageId"
```

To obtain an array with all the states of the images returned by the command `aws ec2 describe-images` you would do:

```bash
$ aws ec2 describe-images --query "Images[*].State"
```

| NOTE: |
| :---- |
| To update the output of a particular command you can use the `--output text` modifier. |

#### Labs 4.4: CLI: Spin up a temporary VM with a given image

The following script:
+ spins up a VM on the default VPC and first subnet of the VPC
+ creates a security group that opens port 22 to the world
+ waits until the VM is running
+ connects to the machine using SSH using the configured key pair
+ waits for the user to click on Enter to signal the use of the VM is no longer needed
+ terminates the instance
+ waits for the instance to be terminates
+ deletes the created security group

```bash
#!/bin/bash -e

IMAGE_NAME='amzn2-ami-hvm-2.0.20210219.*-x86_64-gp2'

AMI_ID="$(aws \
ec2 describe-images \
--filters "Name=name,Values=$IMAGE_NAME" \
--query "Images[0].ImageId" \
--output text)"

VPC_ID="$(aws \
ec2 describe-vpcs \
--filters "Name=isDefault,Values=true" \
--query "Vpcs[0].VpcId" \
--output text)"

SUBNET_ID="$(aws \
ec2 describe-subnets \
--filters "Name=vpc-id,Values=$VPC_ID" \
--query "Subnets[0].SubnetId" \
--output text)"

SG_ID="$(aws \
ec2 create-security-group \
--group-name temp-security-group \
--description "Temporaty security group created by spin_up_vm.sh" \
--vpc-id "$VPC_ID" \
--output text)"

aws \
ec2 authorize-security-group-ingress \
--group-id "$SG_ID" \
--protocol tcp --port 22 --cidr 0.0.0.0/0

INSTANCE_ID=$(aws \
ec2 run-instances \
--image-id "$AMI_ID" \
--key-name "$KEY_PAIR_NAME" \
--instance-type t2.micro \
--security-group-ids "$SG_ID" \
--subnet-id "$SUBNET_ID" \
--query "Instances[0].InstanceId" \
--output text)

aws \
ec2 wait instance-running \
--instance-ids "$INSTANCE_ID"

PUBLIC_DNS_NAME="$(aws \
ec2 describe-instances \
--instance-ids "$INSTANCE_ID" \
--query "Reservations[0].Instances[0].PublicDnsName" \
--output text)"

read -r -p "Press [ENTER] to terminate $INSTANCE_ID"

TERMINATION_JSON="$(aws \
ec2 terminate-instances \
--instance-ids "$INSTANCE_ID")"

aws \
ec2 wait instance-terminated \
--instance-ids "$INSTANCE_ID" \

aws \
ec2 delete-security-group \
--group-id "$SG_ID"
```

| EXAMPLE: |
| :------- |
| See [01 &mdash; CLI: Spin up a VM](01-lab4.4-cli-spin-up-vm) for a runnable example. |

#### Labs 4.5: SDK: Spin up a temporary VM with a given image

The following program:
+ spins up a VM on the default VPC and first subnet of the VPC
+ creates a security group that opens port 22 to the world
+ waits until the VM is running
+ connects to the machine using SSH using the configured key pair
+ waits for the user to click on Enter to signal the use of the VM is no longer needed
+ terminates the instance
+ waits for the instance to be terminates
+ deletes the created security group

It uses the AWS SDK for Node.js v3.

```javascript
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
  console.error(`ERROR: Usage node.js main {key-pair-name} [{profile}]`);
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
    console.error(`ERROR: getDefaultVPC: Could not obtain default VPC info: ${ err.message }`);
    throw new Error(err.message);
  }
}

// eslint-disable-next-line no-unused-vars
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

  const { VpcId } = await getDefaultVPC();

  const { SubnetId } = await getFirstSubnet(VpcId);

  let { GroupId } = await getSecurityGroup(VpcId);
  if (GroupId) {
    await deleteSecurityGroup(GroupId);
  }

  ({ GroupId } = await createSecurityGroup(VpcId));

  await openSSH(GroupId);

  const exists = await validateKeyPairExist(keyPairName);
  if (!exists) {
    console.error(`ERROR: main: the key '${ keyPairName }' does not exist`);
    throw new Error('Provided Key Pair does not exist');
  }

  const { InstanceId, State } = await launchInstance(ImageId, keyPairName, 't2.micro', GroupId, SubnetId);

  await waitUntilInstanceRunning(InstanceId);

  const { PublicDnsName } = await getInstanceInfo(InstanceId);
  console.log(`Type:
  ssh -i ~/.ssh/${ keyPairName }.pem ec2-user@${ PublicDnsName }`);

  await readStdin();

  await terminateInstance(InstanceId);

  await waitUntilInstanceTerminated(InstanceId);

  await deleteSecurityGroup(GroupId);
}

main()
  .then(() => console.log('INFO: main: done!'))
  .catch((err) => console.error(`ERROR: main: ${ err.message }`));
```

| EXAMPLE: |
| :------- |
| See [02 &mdash; SDK: Spin up a VM](02-lab4.5-sdk-spin-up-vm) for a runnable example. |

#### Labs 4.6: CloudFormation: spin up a VM with a template

The following section guides you through the process of launching a VM using a *CloudFormation* template:

1. Navigate to the *CloudFormation* service

2. Click on Create Stack

3. Select the way on which you want to provide the template: either uploading it from local or taking it from Amazon S3. If you select upload from file, a bucket with a random name will be created for you following the pattern: `cf-templates-{random-hash}-{region}` for example: `cf-templates-361znq9xehvc-us-east-1`

| EXAMPLE: |
| :------- |
| See [03 &mdash; CloudFormation: Spin up a VM](chapter19-aws/04-programming-infra/03-lab4.6-cloudformation-spin-up-vm) for *CloudFormation* template. |

4. The template syntax will be checked at this point. Any error found will require you to re-upload the template with the changes fixed.

5. Then you will be provided with a dialog to name the template and fill up the parameters from the template.

6. After that, you will have to provide the stack options: tags, policies, etc.

7. Then you will be provided with a summary page to review the details, where you will be able to create the infrastructure.

#### Labs 4.6: CloudFormation: modifying an existing *CloudFormation* stack

Once a stack has been defined, you will be able to make modifications, which *CloudFormation* will be able to apply in the smoothest way:

1. From *CloudFormation* service, select the corresponding stack and click on update.

2. Select whether you want to use the same template, or make modifications on the parameters on the existing one. Let's assume you just want to change a certain parameter (e.g. the instance size). If you want to do more deep modifications, you might want to make modifications in the designer (e.g. change the security group so that the instance is only opened to your IP address).

3. If opening the designer was required, you will need to click on *Create stack* to create a new stack from the modified template. This will be uploaded to S3 as well.

 4. Follow the wizard steps and click on update. The stack will be updated according to the changes.

#### Labs 4.7: CloudFormation: deleting an existing *CloudFormation* stack

From *CloudFormation* service, select an existing stack and click delete. This will delete all the resources declared in the *template* used to create the *stack*.

| NOTE: |
| :---- |
| Please note that the *CloudFormation* templates stored in S3 will not be deleted as part of the *CloudFormation* stack deletion. |


### You know you've mastered this section when...

+ You're comfortable using the CLI, the Node.js V3 SDK and CloudFormation to automate the infrastructure on AWS.

+ You understand the benefits of using *IaC* to define your infrastructure with respect to the other approaches.

+ You are comfortable with the basics of *CloudFormation* service, and know how to interact with the service to launch an instance.

### Code samples and mini-projects

#### [01 &mdash; CLI: Spin up a VM](01-lab4.4-cli-spin-up-vm)
Illustrates how to use the CLI to spin up a new VM.

#### [02 &mdash; SDK: Spin up a VM](02-lab4.5-sdk-spin-up-vm)
Illustrates how to use the AWS SDK for Node.js (v3) to spin up a new VM.

#### [03 &mdash; CloudFormation: Spin up a VM](chapter19-aws/04-programming-infra/03-lab4.6-cloudformation-spin-up-vm)
A simple CloudFormation template to spin up a VM.

### Services used in this chapter

| AWS Service | Category | Description |
| :---------- | :------- | :---------- |
| AWS CloudFormation | Management and Governance | Gives developers and system admins an easy way to create and manage a collection of related AWS resources.<br>The service supports provisioning, updating, and deletion in an orderly and predictable fashion.<br>*AWS CloudFormation* is the *IaC* solution for AWS. |
| Amazon EC2 | Compute | Web service that provides secure, resizable compute capacity in the cloud.<br><small>It is designed to make web-scale computing easier for developers.<br>Amazon EC2 changes the economonics of computing by allowing you to pay only for capacity that you actually use.<br>Amazon EC2 provides devs and sysadmins the tools to build failure resilient applications and isolate themselves from common failure scenarios.</small> |
| AWS IAM | Security, Identity, and Compliance | *AWS Identity and Access Management (IAM)* enables you to securely control access to AWS services and resources for your users.<br>Using *AWS IAM* you can create and manage AWS users and groups, and use permissions to allow and deny their access to AWS resources. |

