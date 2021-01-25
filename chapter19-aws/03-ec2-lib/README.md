# 03 &mdash; EC2 Lib
> An orchestration of several EC2 related actions using AWS SDK.

# Description
The following example implements in Node.js the following actions:
* get the AMI information for a given AMI ID
* list the AMIs matching a particular AMI name
* gets the default VPC
* gets the first subnet ID from the default VPC
* creates a security group which will allow SSH from anywhere
* launches an EC2 instance on that subnetId with the given security group and using a key named `mykey`
+ waits until the instance is running
+ displays the public DNS name of the EC2 instance, so that you can connect to it using SSH
+ prompts the user for confirmation to terminate the instance
+ terminates the instance
+ waits for a few seconds to give AWS time to terminate the network interface of the recently terminated instance
+ deletes the security group