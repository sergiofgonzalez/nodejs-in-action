# Chapter 19 &mdash; Interacting with Amazon Web Services
## Section 5: Application Deployment Automation
> TBD

### Summary
+ Creating VMs and running scripts on startup with *AWS CloudFormation*
+ Deploying common web apps with AWS Elastic Beanstalk
+ Deploying multilayer apps with AWS OpsWorks
+ Comparing different deployment services on AWS

### Intro

In this section we will explore three AWS tools for deploying application to VMs on AWS.

| NOTE: |
| :---- |
| We will understand deployment as the process of installing, updating and configuring a software application and its dependencies to AWS. |

### How to approach application deployment in the cloud

When working in the cloud, old-school methods consisting in direct interaction with machines, and following how-to guides and run books are not appropriate because they don't scale well when the number of machines grow.

In the cloud, we need to *automate* all those tasks both for increasing efficiency and decreasing the human error associated to manual tasks.

### Deployment options on AWS

The most common ways to deploy *traditional application stacks* in *AWS* rely on these three services:
+ *AWS CloudFormation*
+ *AWS Elastic Beanstalk*
+ *AWS OpsWorks*

The effort and flexibility varies from service to service, with *Elastic Beanstalk* being the service that requires less effort, but provides little flexibility, *AWS CloudFormation* the option that provides total control but requires more effort, and *AWS OpsWorks* sitting in the middle.

#### Application deployment with *AWS CloudFormation*

*AWS CloudFormation* is a good option to deploy an application into an *EC2 instance*, as you can benefit from several advanced techniques that would let you perform not only the infrastructure provisioning, but also the OS and application configuration.

In this section, we will explore some of these techniques, but describing the approach that we would follow to install a somewhat complicated application (in terms of configuration) in an *EC2 instance* using *AWS CloudFormation*.

##### The *CloudFormation* template

The first thing you must write is the *CloudFormation* template. In its first installment, you can just focus on the infrastructure provisioning pieces, and then write the application configuration part.

The following snippet shows the final result, that we will then explore:

```yaml
---
AWSTemplateFormatVersion: '2010-09-09'
Description: 'Template to deploy an EC2 instance with OpenSwan'

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
  IPSecSharedSecret:
    Description: 'Shared secret for IPSec'
    Type: String
  VPNUser:
    Description: 'VPN user'
    Type: String
  VPNPassword:
    Description: 'VPN password'
    Type: String

Mappings:
  RegionToAMIMap:
    # Including only three regions for demonstration purposes
    'us-east-1':
      AMI: 'ami-0915bcb5fa77e4892'

    'eu-central-1':
      AMI: 'ami-02f9ea74050d6f812'

    'ap-southeast-1':
      AMI: 'ami-0d06583a13678c938'

Resources:
  EC2Instance:
    Type: 'AWS::EC2::Instance'
    Properties:
      InstanceType: 't2.micro'
      SecurityGroupIds:
        - Ref! InstanceSecurityGroup
      KeyName: !Ref KeyName
      ImageId: !FindInMap [RegionToAMIMap, !Ref 'AWS::Region', AMI]
      SubnetId: !Ref Subnet
      UserData:
        'Fn::Base64': !Sub |
          #!/bin/bash -x
          export IPSEC_PSK="${IPSecSharedSecret}"
          export VPN_USER="${VPNUser}"
          export VPN_PASSWORD="${VPNPassword}"
          PRIVATE_IP="$(curl -s http://169.254.169.254/latest/meta-data/local-ipv4)"
          PUBLIC_IP="$(curl -s http://169.254.169.254/latest/meta-data/public-ipv4)"
          yum-config-manager --enable epel
          yum clean all
          yum install -y openswan xl2tpd
          cat > /etc/ipsec.conf <<EOF
          version 2.0
          config setup
            nat_traversal=yes
            virtual_private=%v4:10.0.0.0/8,%v4:192.168.0.0/16,%v4:172.16.0.0/12,%v4:25.0.0.0/8,%v6:fd00::/8,%v6:fe80::/10
            oe=off
            protostack=netkey
            nhelpers=0
            interfaces=%defaultroute
          conn vpnpsk
            auto=add
            left=$PRIVATE_IP
            leftid=$PUBLIC_IP
            leftsubnet=$PRIVATE_IP/32
            leftnexthop=%defaultroute
            leftprotoport=17/1701
            rightprotoport=17/%any
            right=%any
            rightsubnetwithin=0.0.0.0/0
            forceencaps=yes
            authby=secret
            pfs=no
            type=transport
            auth=esp
            ike=3des-sha1
            phase2alg=3des-sha1
            dpddelay=30
            dpdtimeout=120
            dpdaction=clear
          EOF
          cat > /etc/ipsec.secrets <<EOF
          $PUBLIC_IP %any : PSK "${IPSEC_PSK}"
          EOF
          cat > /etc/xl2tpd/xl2tpd.conf <<EOF
          [global]
          port = 1701
          [lns default]
          ip range = 192.168.42.10-192.168.42.250
          local ip = 192.168.42.1
          require chap = yes
          refuse pap = yes
          require authentication = yes
          name = l2tpd
          pppoptfile = /etc/ppp/options.xl2tpd
          length bit = yes
          EOF
          cat > /etc/ppp/chap-secrets <<EOF
          ${VPN_USER} l2tpd ${VPN_PASSWORD} *
          EOF
          cat > /etc/ppp/options.xl2tpd <<EOF
          ipcp-accept-local
          ipcp-accept-remote
          ms-dns 8.8.8.8
          ms-dns 8.8.4.4
          noccp
          auth
          crtscts
          idle 1800
          mtu 1280
          mru 1280
          lock
          connect-delay 5000
          EOF
          iptables -t nat -A POSTROUTING -s 192.168.42.0/24 -o eth0 -j MASQUERADE
          echo 1 > /proc/sys/net/ipv4/ip_forward
          iptables-save > /etc/iptables.rules
          mkdir -p /etc/network/if-pre-up.d
          cat > /etc/network/if-pre-up.d/iptablesload <<EOF
          #!/bin/sh
          iptables-restore < /etc/iptables.rules
          echo 1 > /proc/sys/net/ipv4/ip_forward
          exit 0
          EOF
          service ipsec start
          service xl2tpd start
          chkconfig ipsec on
          chkconfig xl2tpd on
          /opt/aws/bin/cfn-signal -e $? --stack ${AWS::StackName} --resource EC2Instance --region ${AWS::Region}
    CreationPolicy:
      ResourceSignal:
        Timeout: PT10M
  InstanceSecurityGroup:
    Type: 'AWS::EC2::SecurityGroup'
    Properties:
      GroupDescription: 'Acess to VPN server'
      VpcId: !Ref VPC
      SecurityGroupIngress:
        - IpProtocol: tcp
          FromPort: 22
          ToPort: 22
          CidrIp: '0.0.0.0/0'
        - IpProtocol: udp
          FromPort: 500
          ToPort: 500
          CidrIp: '0.0.0.0/0'
        - IpProtocol: udp
          FromPort: 1701
          ToPort: 1701
          CidrIp: '0.0.0.0/0'
        - IpProtocol: udp
          FromPort: 4500
          ToPort: 4500
          CidrIp: '0.0.0.0/0'
Outputs:
  ServerIP:
    Description: 'Public IP address of the vpn server'
    Value: !GetAtt 'EC2Instance.PublicIp'
  IPSecSharedSecret:
    Description: 'Shared key for the VPN connection (IPSec)'
    Value: !Ref  IPSecSharedSecret
  VPNUser:
    Description: 'The username for the vpn connection'
    Value: !Ref VPNUser
  VPNPassword:
    Description: 'The password for the vpn connection'
    Value: !Ref VPNPassword
```

The first part is the header of the *CloudFormation* template. It should include the `AWSTemplateFormatVersion` along with the description:

```yaml
---
AWSTemplateFormatVersion: '2010-09-09'
Description: 'Template to deploy an EC2 instance with OpenSwan'
```

| NOTE: |
| :---- |
| `---` in a YAML file denotes the beginning of a document and it is optional. You can also use `...` to denote the end of a document. |

Next is the `Parameters` section. The section should include any type of value that may vary from deployment to deployment, such as VPC ids, passwords, key pairs, etc.
By declaring those values parameters, you will make your template more flexible as it will be able to accommodate a larger number of use cases. The values for those parameters will be given when the stack is to be created, and you will be able to reference them in your templates using `!Ref <parameterName>`.

For this particular case, we have:

```yaml
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
  IPSecSharedSecret:
    Description: 'Shared secret for IPSec'
    Type: String
  VPNUser:
    Description: 'VPN user'
    Type: String
  VPNPassword:
    Description: 'VPN password'
    Type: String
```

Right after that, we declare a `Mappings` section in which you can define a key-value map (or dictionary). In our case, we define `RegionToAMIMap` that will let us choose the correct *AMI ID* to use in each particular region.

```yaml
Mappings:
  RegionToAMIMap:
    # Including only three regions for demonstration purposes
    'us-east-1':
      AMI: 'ami-0915bcb5fa77e4892'

    'eu-central-1':
      AMI: 'ami-02f9ea74050d6f812'

    'ap-southeast-1':
      AMI: 'ami-0d06583a13678c938'
```


Then we have the `Resources` section. As we're deploying our application in an *EC2 instance* we will need the following resources:
+ `AWS::EC2::Instance`
+ `AWS::EC2::SecurityGroup`

Let's start with the *EC2 instance*. The first part is plain an simple, we declare the name of the resource in the *CloudFormationTemplate* and start enumerating the properties that need to be adjusted:

```yaml
Resources:
  EC2Instance:
    Type: 'AWS::EC2::Instance'
    Properties:
      InstanceType: 't2.micro'
      SecurityGroupIds:
        - Ref! InstanceSecurityGroup
      KeyName: !Ref KeyName
      ImageId: !FindInMap [RegionToAMIMap, !Ref 'AWS::Region', AMI]
      SubnetId: !Ref Subnet
```

A few things to note in the previous snippet:
+ You can use `!Ref` to refer to values defined either as parameters (e.g. `!Ref KeyName`) or resources (e.g. `!Ref InstanceSecurityGroup`, which will be defined later).
+ You can you use `!FindInMap [{MapName}, {key}, {ValueName}]` to retrieve a value from a map.
+ You can obtain what is the current selected region by referring to `AWS::Region` as in `!Ref 'AWS::Region'`.

Next, is the *user data* configuration. You can inject a *relatively small* amount of custom data (<16KB) that can be added to the *EC2 instance* information (and also as a property of the *CloudFormation* template). This info will be injected into the VM when it is launched, and then available later from the machine itself. The most common use case for the user data consists in configuring a shell script, as it will be executed at the end of the boot process as the VM's root user.

Additionally, the user data will always be accessible from the VM via a simple GET HTTP request to http://169.254.169.254/latest/user-data. That piece of information will only be accessible from the VM itself.

The information configured as part of the *user data* can also reference parameters defined in the *CloudFormation* template, which makes the *user data* perfect enough for all kind of additional deployments and configurations that might be needed:

```yaml
  EC2Instance:
    Type: 'AWS::EC2::Instance'
    Properties:
      InstanceType: 't2.micro'
      SecurityGroupIds:
        - Ref! InstanceSecurityGroup
      KeyName: !Ref KeyName
      ImageId: !FindInMap [RegionToAMIMap, !Ref 'AWS::Region', AMI]
      SubnetId: !Ref Subnet
      UserData:
        'Fn::Base64': !Sub |
          #!/bin/bash -x
          export IPSEC_PSK="${IPSecSharedSecret}"
          export VPN_USER="${VPNUser}"
          export VPN_PASSWORD="${VPNPassword}"
          PRIVATE_IP="$(curl -s http://169.254.169.254/latest/meta-data/local-ipv4)"
          PUBLIC_IP="$(curl -s http://169.254.169.254/latest/meta-data/public-ipv4)"
          yum-config-manager --enable epel
          yum clean all
          yum install -y openswan xl2tpd
          cat > /etc/ipsec.conf <<EOF
          version 2.0
          ...
          dpdaction=clear
          EOF
          chkconfig xl2tpd on
          /opt/aws/bin/cfn-signal -e $? --stack ${AWS::StackName} --resource EC2Instance --region ${AWS::Region}
```

Note that:
+ The `UserData` is identified by a key `Fn::Base64` which will force the encoding of information in *base64*. You can also use that function to convert strings to *base64* in your templates using the syntax: `!Base64 'value'`.

+ The first line of the user data includes `!Sub` which enables the substitution of *CloudFormation* parameters such as `${VPN_USER}` by their corresponding values. Note that `!Sub ${VPC.CidrBlock}` will be equivalent to `!GetAtt 'VPC.CidrBlock'`.

+ You can query the special address `http://169.254.169.254/latest/meta-data/local-ipv4` and `http://169.254.169.254/latest/meta-data/public-ipv4` to obtain the private and public IP address of the instance.

+ You can create files using the syntax:
```bash
cat > {path/to/file} <<EOF
... file contents here
EOF
```

+ You can reference resources from the template or the environment using `${AWS::StackName}` or `${AWS::Region}`.

+ You can signal *CloudFormation* that your instance has completed its initialization script by invoking `/opt/aws/bin/cfn-signal -e $? --stack ${AWS::StackName} --resource EC2Instance --region ${AWS::Region}`. The `-e $?` sends the exit code of the last executed script to *CloudFormation*.

| NOTE: |
| :---- |
| Including the whole initialization script in the *CloudFormation* template (as we have done in the example for demonstration purposes) is quite ugly. A much more elegant way to do the same would be to place the script in a place accessible from the instance and use `curl -s <script-location> | bash -ex`. Be careful though with the variable substitution within the script. |

Finally, we set the `CreationPolicy` property to inform *CloudFormation* how long it should wait for the resource to be created and configured (in our case, 10 minutes):


```yaml
  EC2Instance:
    Type: 'AWS::EC2::Instance'
    Properties:
      InstanceType: 't2.micro'
      SecurityGroupIds:
        - Ref! InstanceSecurityGroup
      KeyName: !Ref KeyName
      ImageId: !FindInMap [RegionToAMIMap, !Ref 'AWS::Region', AMI]
      SubnetId: !Ref Subnet
      UserData:
        'Fn::Base64': !Sub |
          #!/bin/bash -x
          ...
    CreationPolicy:
      ResourceSignal:
        Timeout: PT10M
```

| NOTE: |
| :---- |
| The `Timeout` value must be specified in ISO8601 duration format: `"PT#H#M#S"`. |


With the *EC2* instance configured, we can got and configure the security group, which will count four rules for the *inbound traffic*:

```yaml
  InstanceSecurityGroup:
    Type: 'AWS::EC2::SecurityGroup'
    Properties:
      GroupDescription: 'Acess to VPN server'
      VpcId: !Ref VPC
      SecurityGroupIngress:
        - IpProtocol: tcp
          FromPort: 22
          ToPort: 22
          CidrIp: '0.0.0.0/0'
        - IpProtocol: udp
          FromPort: 500
          ToPort: 500
          CidrIp: '0.0.0.0/0'
        - IpProtocol: udp
          FromPort: 1701
          ToPort: 1701
          CidrIp: '0.0.0.0/0'
        - IpProtocol: udp
          FromPort: 4500
          ToPort: 4500
          CidrIp: '0.0.0.0/0'
```

Finally, we write the `Outputs` section, that collects the information that is value after the stack has been created:

```yml
Outputs:
  ServerIP:
    Description: 'Public IP address of the vpn server'
    Value: !GetAtt 'EC2Instance.PublicIp'
  IPSecSharedSecret:
    Description: 'Shared key for the VPN connection (IPSec)'
    Value: !Ref  IPSecSharedSecret
  VPNUser:
    Description: 'The username for the vpn connection'
    Value: !Ref VPNUser
  VPNPassword:
    Description: 'The password for the vpn connection'
    Value: !Ref VPNPassword
```

Note how you can either use `!Ref` to refer to specific parameter values, or `!GetAtt` when you should refer to specific fields within a parameter or resources that is created in the template.

##### The deployment script

Once the template is written, we need to deploy it so that a *CloudFormation stack* is created. We already know how to do it from the *AWS Console*, so now we will explore a more streamlined way using the CLI and a deployment script.

In the same way that you can create an *EC2 instance* from the command line using `aws ec2`, you can also invoke *CloudFormation* using `aws cloudformation`. In particular, to deploy the template we've just created we could do:

```bash
#!/bin/bash -ex

# Define and populate the parameters to be injected in the stack
VpcId="S(aws ec2 describe-vpcs --filters "Name=isDefault,Values=true" --query "Vpcs[0].VpcId" --output text)"
SubnetId="$(aws ec2 describe-subnets --filters "Name=vpc-id,Values=$VpcId" --query "Subnets[0].SubnetId" --output text)"
SharedSecret="$(openssl rand -base64 30)"
Password="$(openssl rand -base64 30)"

# create the stack
aws \
cloudformation create-stack \
--stack-name vpn \
--template-url https://s3.amazonaws.com/awsinaction-code2/chapter05/vpn-cloudformation.yaml \
--parameters "ParameterKey=KeyName,ParameterValue=mykey" \
"ParameterKey=VPC,ParameterValue=$VpcId" \
"ParameterKey=Subnet,ParameterValue=$SubnetId" \
"ParameterKey=IPSecSharedSecret,ParameterValue=$SharedSecret" \
"ParameterKey=VPNUser,ParameterValue=vpn" \
"ParameterKey=VPNPassword,ParameterValue=$Password"

# wait for the stack to be created
aws \
cloudformation wait stack-create-complete \
--stack-name vpn

# retrieve the stack outputs
aws \
cloudformation describe-stacks \
--stack-name vpn \
--query "Stacks[0].Outputs"
```

### Deploying a simple web application with *AWS Elastic Beanstalk*
5.4

### Labs


### You know you've mastered this section when...


### Code samples and mini-projects

#### [01 &mdash; CloudFormation: Deployment sample](01-cloudformation-deployment-sample)
A comprehensive CloudFormation template demonstrating several deployment techniques such as *user data*, *variable substitution*, `cfn-signal`...

### Services used in this chapter

| AWS Service | Category | Description |
| :---------- | :------- | :---------- |
| AWS CloudFormation | Management and Governance | Gives developers and system admins an easy way to create and manage a collection of related AWS resources.<br>The service supports provisioning, updating, and deletion in an orderly and predictable fashion.<br>*AWS CloudFormation* is the *IaC* solution for AWS. |
| Amazon EC2 | Compute | Web service that provides secure, resizable compute capacity in the cloud.<br><small>It is designed to make web-scale computing easier for developers.<br>Amazon EC2 changes the economonics of computing by allowing you to pay only for capacity that you actually use.<br>Amazon EC2 provides devs and sysadmins the tools to build failure resilient applications and isolate themselves from common failure scenarios.</small> |
