# Chapter 19 &mdash; Interacting with Amazon Web Services
> Node.js applications interacting with AWS interactively

## [01-grokking-sqs](./01-grokking-sqs/)
publishing and consuming queue messages from *Amazon Simple Queue Service (SQS)* using a callback based library.

## [02-ec2-get-amis](./02-ec2-get-amis/)
Interacting with AWS SDK to obtain the list of AMIs matching a given pattern.

## [03-ec2-lib](./03-ec2-lib/)
A library of EC2 related actions such as create machines, list machines, obtain subnets and a simple program that orchestrates them.

## [04-lambda-s3](./04-lambda-s3/)
An example of a Lambda function using the *nodejs14x* runtime and the S3 AWS SDK to validate that a bucket exists.

## [05-lambda-aurora-serverless](./05-lambda-aurora-serverless/)
An example of a Lambda function using the *nodejs14x* runtime and the `serverless-mysql` package to connect to an Aurora database and submit a query.

## [06-lambda-outbound-internet](./06-lambda-outbound-internet/)
An example of a Lambda function using the *nodejs14x* runtime that sends outbound HTTP HEAD request to a list of external sites to validate if outbound connectivity to the public internet works from the Lambda function.

## [07 &mdash; AWS S3 Attachment URL](07-s3-attachment-url)
Obtain a signed S3 url that provides a limited time public access to a file.

## [08 &mdash; *AWS Elasticsearch* concepts](08-aws-elasticsearch-concepts)
A few entry-level concepts about *Elasticsearch* and *AWS Elasticsearch* service. The directory does not include any source code.

## [09 &mdash; *Amazon SageMaker* Concepts](09-sage-maker-concepts)
A few concepts on *Amazon SageMaker*.

## [10 &mdash; *AWS Glue* Concepts](10-glue-concepts)
A few entry-level definitions about *AWS Glue*.
