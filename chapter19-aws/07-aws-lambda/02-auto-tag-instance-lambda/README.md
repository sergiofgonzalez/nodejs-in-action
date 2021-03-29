# Part 2: Applications
## Chapter 19 &mdash; Amazon Web Services
### Section 7: AWS Lambda
#### 02 &mdash; Auto tagging of launched instance
> application involving an *Amazon EventBridge event* that triggers a lambda function that expects an *EC2 `RunInstances` event* and tags the newly created instance

This directory contains all the artifacts needed for an application that automatically tags new instances launched.

The application consists of:
+ `auto-tag-lambda-function/` &mdash; the directory containing the Lambda function that implements the business logic to tag the *EC2 instance*. The function can also be deployed, packaged and tested manually (instead of as a component within the *CloudFormation/SAM* template).

+ `sam-auto-tag-instance.yml` &mdash; the *CloudFormation/SAM template* describing all the things needed for the application (*CloudTrail*, *EventBridge event*, *Lambda*, *inline policies*...)

+ `sam_*.sh` &mdash; a set of scripts that perform the packaging of the *Lambda function*, the deployment and creation of the *CloudFormation/SAM stack*, and the deletion of the stack once you're done.

##### Usage Notes

To package the application type:

```bash
./sam_package.sh <aws-profile>
```

This will create a deployment bucket for the application and upload the application and dependencies to that bucket so that it can be subsequently used. As part of the process, an artifact `output.yml` will be created, which is the input for the subsequent step.

To deploy/update the stack type:
```bash
./sam_deploy.sh
```

That step reads the `output.yml` and creates all the necessary resources.

If successfully created, you will be able to test that every new instance launched gets automatically tagged with `Owner: <username-who-launched-instance>`.

| NOTE: |
| :---- |
| Please take into account that the `RunInstances` event in which the application depends may not be triggered immediately after an instance is launched and found to be running.<br>In some of the tests, the instance was not tagged after 15 minutes. In some other tests, the instance was not tagged at all. |

You can clean up the resources provisioned by the stack typing:
```bash
./sam_delete.sh
```