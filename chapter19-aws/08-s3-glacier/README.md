# Chapter 19 &mdash; Interacting with Amazon Web Services
## Section 8: Amazon S3 and Glacier
> TBD

### Summary
*Amazon S3* provided a revolutionary approach to solve the storage needs of modern applications: a distributed data store consisting of a large number of machines connected over a network.

*Amazon S3* is a simple-to-use, fully managed distributed data store provided by AWS, where data is managed as objects. The storage system is classified as an *object store* for that reason.

On top of that, we will discuss *Amazon Glacier*, a backup and archiving store where data storage cost less that storing data on *Amazon S3*, while retrieval times from *Amazon Glacier* can take hours instead of the immediate access *Amazon S3* provides.

### What is an object store?

In an object store, data is stored as objects, with each object consisting of a globally unique UUID, some metadata, and the data itself.

In *Amazon S3*, the object's globally unique UUID is known as its *key*.

The object metadata includes:
+ date of last modification
+ object size
+ object's owner
+ object's content type

### Amazon S3

*Amazon S3* is one of the oldest (if not the oldest) services provided by AWS. *S3* is an acronym of *Simple Storage Service. The service lets you store and retrieve data organized as objects via an API over HTTPS.

Typical use cases for S3 are:
+ storing and delivering static website content
+ backup up data
+ storing structured and unstructured data for analytics
+ storing and delivering user-generated content

*Amazon S3* offers unlimited storage space, for any kind of data (images, documents, binaries...) with an object size limit of 5 TB.

In *Amazon S3* you pay for every GB you store, for the amount of requests that you do to *Amazon S3*, and for all the transferred daata.

*Amazon S3* uses buckets to group objects. A *bucket* is a container for objects. A *bucket* must have a *globally unique name* within the service.

As with other services, you can interact with *Amazon S3* from the *AWS management console*, *AWS CLI* and *AWS SDK*.

### Using Amazon S3 from AWS CLI

In this section we will illustrate how to interact with *Amazon S3* using the *AWS CLI*.

To create a bucket use:

```bash
# mb stands for make bucket
$ aws s3 mb s3://<your-bucket-name>
```

To synchronize an existing local folder to *S3* use `s3 sync`:

```bash
$ aws s3 sync <local-folder> s3://<your-bucket-name>/path/to/backup
```

To retrieve the contents of S3 use `s3 cp`:

```bash
$ aws s3 cp --recursive s3://<your-bucket-name>/path/to/backup <local-folder>
```

A bucket can be deleted using `s3 rb`:

```bash
# rb stands for remove bucket
$ aws s3 rb s3://<your-bucket>
```

As a safety measure, only empty buckets can be removed. If you want to remove a bucket even when it contains objects you can use the `--force` argument:

```bash
# remove bucket even if not empty
$ aws s3 rb --force s3://<your-bucket>
```


### Versioning for objects

By default, S3 versioning is not turned on the service. This means that if you upload to *Amazon S3* an object with the same key of an existing object, the previous object will be overwritten and you will lose the old data.

You can change this behavior by activating *versioning* using the following command:

```bash
$ aws s3api put-bucket-versioning \
--bucket <bucket-name> \
--versioning-configuration Status=Enabled
```

When enabling versioning, you will not lose the previous contents of a file when uploading a new object with the same key.

You will be able to list all the versions of an object using:

```bash
$ aws s3api list-object-versions \
--bucket <your-bucket>
--prefix <your-key> \
```

You can also download any version of the object using

```bash
aws \
s3api get-object \
--bucket <your-bucket> \
--key <your-key> \
--version-id <version-id> \
<your-local-file>
```

| EXAMPLE: |
| :------- |
| See [01 &mdash; Amazon S3: *Amazon S3* from *AWS CLI*](01-hello-s3-versioning) for a runnable example involving bucket creation and configuration (blocking public access, enabling encryption and versioning), copying, downloading, retrieving specific versions, deleting buckets... |

### Archiving objects to optimize costs

### You know you've mastered this section when...

+ You understand the details of the *AWS Lambda* service and its serverless model:
  + No need to manage and maintain virtual machines
  + Fully managed service offering scalability and high availability
  + Biller by request/by resource consumption


### Code samples and mini-projects

#### [01 &mdash; Amazon S3: *Amazon S3* from *AWS CLI*](01-hello-s3-versioning)
A collection of simple scripts illustrating how to interact with *Amazon S3* from the *CLI*


### Services used in this chapter

| AWS Service | Category | Description |
| :---------- | :------- | :---------- |
| Amazon Glacier | Storage | Secure, durable, and extremely low-cost storage service for data archiving and long-term backup. |
| Amazon S3 | Storage | Object storage service that offers industry-leading scalability, data availability, security, and performance. |


### ToDo

