# Part 2: Applications
## Chapter 19 &mdash; Amazon Web Services
### Section 6: Security concepts in AWS: IAM, security groups, and VPCs
#### 05 &mdash; CloudFormation: Infrastructure with VPC and subnets
> A *CloudFormation* instance that spins up a complete network infrastructure for an application, with public and private subnets.

The following picture describes the architecture:

![Bastion Host](../images/VPC_design.png)


The final template is created in several steps to let you assert how the process is going and perform the necessary intermediate validations.

| NOTE: |
| :---- |
| The purpose of the template is to illustrate how to perform a sound network design, and therefore several concepts such as *security group* design are not included.<br>It is encouraged to perform a *multi-layered* approach to security implementing both *security groups* and *Network ACLs*. |

+ Stage 1 &mdash; create the VPC, the *Internet Gateway*, and the *bastion host public subnet*.
+ Stage 2 &mdash; create the *proxy servers public subnet*.
+ Stage 3 &mdash; create the *web servers private subnet*, without enabling web servers with any Internet connectivity.
+ Stage 4 &mdash; create a *NAT gateway* to enable the *web servers private subnet* with outbound Internet connectivity.

##### Usage

You will find a bash script that will submit the template YAML to *CloudFormation* using the *AWS CLI* for the different stages.

```bash
./create-stack.sh {key-name} [{profile-name:-default}]
```

Once finished, you can do:
```bash
./delete-stack.sh [{profile-name:-default}]
```
