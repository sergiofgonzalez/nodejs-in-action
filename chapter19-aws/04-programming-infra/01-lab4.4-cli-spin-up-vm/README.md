# Part 2: Applications
## Chapter 19 &mdash; Amazon Web Services
### Section 4: Programming your infrastructure
#### 01 &mdash; CLI: Spin up a VM
> Illustrates how to use the CLI to spin up a new VM

##### Usage

Type: `spin_up_vm.sh [profile-name] [key-pair-name]`

The script will create a t2.micro instance with an *AMI* whose name matches the `IMAGE_NAME` parameter defined within the script, in the default VPC and the first available subnet, and with a security group that allows accessing it through SSH.

Once you're done with the VM you can type enter, and the script will terminate the instance and delete the security group.
