# Part 2: Applications
## Chapter 19 &mdash; Amazon Web Services
### Section 6: Security concepts in AWS: IAM, security groups, and VPCs
#### 03 &mdash; CloudFormation: Instance attached with Security Group
> A *CloudFormation* instance that spins up an *EC2 instance* configured to allow ICMP from any IP address and that only allows SSH from an specific public IP address.

##### Usage

You will find a bash script that will submit the template YAML to *CloudFormation* using the *AWS CLI*.

```bash
./ec2-instance-security-group-create-stack.sh {profile-name}
```

| NOTE: |
| :---- |
| Do not forget to delete the stack once you're done with the test. You can use the script `./ec2-instance-security-group-create-stack.sh {profile-name}` to do so. |