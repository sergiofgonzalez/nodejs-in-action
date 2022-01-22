# Part 2: Applications
## Chapter 19 &mdash; Amazon Web Services
### Section 6: Security concepts in AWS: IAM, security groups, and VPCs
#### 04 &mdash; CloudFormation: basic app infrastructure with a bastion host
> A *CloudFormation* instance that spins up an infrastructure consisting of a *bastion host* that is the only entrypoint two *EC2 instances* that sit behind it. The security groups are configured according to the *Principle of Least Privilege*.

The following picture describes the approach:

![Bastion Host](../images/bastion_host_concept.png)

##### Usage

You will find a bash script that will submit the template YAML to *CloudFormation* using the *AWS CLI*.

```bash
./create-stack.sh {key-name} [{profile-name:-default}]
```

Once finished, you can do:
```bash
./delete-stack.sh [{profile-name:-default}]
```
