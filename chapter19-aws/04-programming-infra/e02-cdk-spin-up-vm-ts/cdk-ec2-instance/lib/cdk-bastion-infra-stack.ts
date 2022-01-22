import { CfnCondition, CfnOutput, CfnParameter, Fn, Stack, StackProps } from 'aws-cdk-lib';
import { Construct } from 'constructs';
import * as ec2 from 'aws-cdk-lib/aws-ec2';

export class CdkBastionInfraStack extends Stack {
  constructor(scope: Construct, id: string, props?: StackProps) {
    super(scope, id, props);

    // get the default VPC
    const vpc = ec2.Vpc.fromLookup(this, 'CdkDefaultVPC', { isDefault: true, region: 'us-east-1' });

    // create the SG for the bastion
    const bastionSecurityGroup = new ec2.SecurityGroup(this, 'CdkBastionSecurityGroup', {
      vpc,
      description: 'Traffic rules for bastion host',
      allowAllOutbound: false
    });

    const adminPublicIpAddress = this.node.tryGetContext('adminPublicIpAddress') || ''

    const ingressRuleCondition = new CfnCondition(this, 'CdkIngressRuleCondition', {
      expression: Fn.conditionNot(Fn.conditionEquals(this.node.tryGetContext('adminPublicIpAddress'), 'AWS::NoValue'))
    });

    // this is just to learn to use CfnConditions
    bastionSecurityGroup.addIngressRule(ec2.Peer.ipv4(adminPublicIpAddress), ec2.Port.tcp(22), 'Allow SSH from admin IP address');
    (bastionSecurityGroup.node.defaultChild as ec2.CfnSecurityGroup).cfnOptions.condition = ingressRuleCondition;

    // get the latest AMI, ARM 64bit arch
    const ami = new ec2.AmazonLinuxImage({
      generation: ec2.AmazonLinuxGeneration.AMAZON_LINUX_2,
      cpuType: ec2.AmazonLinuxCpuType.ARM_64
    });

    // get the keypair
    const keyPair = new CfnParameter(this, 'CdkKeyPair', {
      type: 'AWS::EC2::KeyPair::KeyName',
      description: 'Key Pair for SSH connectivity',
    });

    // launch the bastion
    const bastionEc2 = new ec2.Instance(this, 'CdkBastionEC2', {
      instanceType: ec2.InstanceType.of(ec2.InstanceClass.T4G, ec2.InstanceSize.NANO),
      machineImage: ami,
      vpc: vpc,
      securityGroup: bastionSecurityGroup,
      keyName: keyPair.valueAsString
    });

    // create outputs for connecting
    new CfnOutput(this, 'Bastion IP address', { value: bastionEc2.instancePublicIp });
  }
}
