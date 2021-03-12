# Part 2: Applications
## Chapter 19 &mdash; Amazon Web Services
### Section 6: Security concepts in AWS: IAM, security groups, and VPCs

#### 02 &mdash; CloudFormation: Instance that stops itself
> A *CloudFormation* instance that spins up an *EC2 instance* that stops itself after a certain number of minutes. The example illustrates how to attach *inline IAM roles* to *EC2 instances* using *CloudFormation*.

##### Usage

You will find a bash script that will submit the template YAML to *CloudFormation* using the *AWS CLI*.

```bash
./ec2-instance-self-stop-create-stack.sh {key-pair-name} {lifetime-minutes} {profile-name}
```

| NOTE: |
| :---- |
| Do not forget to delete the stack once you're done with the test. |