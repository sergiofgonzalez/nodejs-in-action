# Part 2: Applications
## Chapter 19 &mdash; Amazon Web Services
### Section 6: Security concepts in AWS: IAM, security groups, and VPCs
#### e02 &mdash; CDK: Spin up an EC2 VM using the CDK
> A CDK stack to create an infrastructure consisting of a single EC2 instance (a bastion) with a Security Group with Ingress and no Egress rules placed on the default VPC.

## Notes

This project creates an EC2 instance using a CDK project.

Not entirely sure I'm following best practices here but the following things are done:
+ The public IP address from where `cdk` is executed is placed in the app context, and then used to configure the Security Group ingress' rules. This has been a bit tricky because you need an async function. Also, if no value is found in the context, a condition is defined so that the bastion security group is not defined. This is probably not very robust, but I've kept it as a reference of how to write CloudFormation conditions.
+ The KeyPair needed to connect to the EC2 instance is declared as a parameter.

In order to run the program you have to do:

```bash
cdk deploy --profile awsia --parameters CdkKeyPair={key-pair}
```


