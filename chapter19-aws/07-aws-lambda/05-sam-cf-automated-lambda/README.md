# Part 2: Applications
## Chapter 19 &mdash; Amazon Web Services
### Section 7: AWS Lambda
#### 05 &mdash; Lambda function: enhancing *CloudFormation/SAM* experience to deploy a custom Lambda function
> An example containing all the resources needed to deploy a custom *Lambda function* using *Cloudformation/SAM* using additional scripts to improve the experience

##### Usage notes

This directory contains a container-based lambda function that is built and deployed using *SAM/CloudFormation templates* using some custom automation scripts.

The first step is to define you *Lambda function* application like the one you find in `lambda-health-check/`. Then you need to update the `lambda-health-check.yml` *CloudFormation/SAM template*.

Right after that type `./sam-build.sh` to build your Lambda function. That will build the container and generate in `.aws-sam/` a modified template that will be used in the subsequent deployment step.

Then, you can use `./sam-deploy.sh <aws-profile>` to deploy the *Lambda function* to AWS.

Finally, you can use `./sam-delete.sh <aws-profile>` to clean up the deployed resources.
