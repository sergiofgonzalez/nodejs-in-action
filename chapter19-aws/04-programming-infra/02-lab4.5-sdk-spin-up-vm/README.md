# Part 2: Applications
## Chapter 19 &mdash; Amazon Web Services
### Section 4: Programming your infrastructure
#### 02 &mdash; SDK: Spin up a VM
> Illustrates how to use the AWS SDK for Node.js (v3) to spin up a new VM

##### Usage

Run:

```bash
npm start {key-pair-name} [{profile-name}]
```

The script will spin up a new t2.micro configured with a security group that allows SSH access from the machine from where the tool is started.

Once you're done with the tool, it will terminate the instance and delete the security group.