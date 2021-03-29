# Part 2: Applications
## Chapter 19 &mdash; Amazon Web Services
### Section 7: AWS Lambda
#### 02 &mdash; Lambda function: Auto tagging of launched instance
> lambda function that listens to a CloudTrail event generated when a new *EC2 instance* is launched and tags the newly created instance

This directory contains a *Lambda* function that is deployed as part of a *CloudFormation/SAM template* whose responsibility is to automatically tag *EC2 instances* launched in the account.

The function receives the contents of the event, extracts the `username` of the user who originates the request and the `instanceId` of the VM and creates a tag for the *EC2 instance*: `Owner: username`.

You can use the following event for testing purposes:

```json
{
  "version": "0",
  "id": "<uuid-of-the-event>",
  "detail-type": "AWS API Call via CloudTrail",
  "source": "aws.ec2",
  "account": "<aws-account-id>",
  "time": "2021-03-25T07:15:53Z",
  "region": "us-east-1",
  "resources": [],
  "detail": {
    "eventVersion": "1.08",
    "userIdentity": {
      "type": "IAMUser",
      "principalId": "<the-principalId>",
      "arn": "arn:aws:iam::<aws-account-id>:user/<user-id-who-originated-the-request>",
      "accountId": "<aws-account-id>",
      "accessKeyId": "<some-access-key>",
      "userName": "<user-id-who-originated-the-request>",
      "sessionContext": {
        "sessionIssuer": {},
        "webIdFederationData": {},
        "attributes": {
          "mfaAuthenticated": "true",
          "creationDate": "2021-03-25T06:46:39Z"
        }
      }
    },
    "responseElements": {
      "requestId": "<uuid-of-the-request>",
      "reservationId": "<reservation-id>",
      "ownerId": "<owner-id>",
      "groupSet": {},
      "instancesSet": {
        "items": [
          {
            "instanceId": "<the-instance-id>",
            "imageId": "ami-0533f2ba8a1995cf9",
            "instanceState": {
              "code": 0,
              "name": "pending"
            }
          }
        ]
      }
    }
  }
}
```

| NOTE: |
| :---- |
| Please take into account that the `RunInstances` event may not be triggered immediately after an instance is launched and found to be running.<br>In some of the tests, the instance was not tagged after 15 minutes. In some other tests, the instance was not tagged at all. |