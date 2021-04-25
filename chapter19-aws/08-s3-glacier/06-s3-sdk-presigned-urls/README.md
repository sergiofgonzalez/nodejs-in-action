# Part 2: Applications
## Chapter 19 &mdash; Amazon Web Services
### Section 8: Amazon S3 and Glacier
#### 06 &mdash; S3 SDK: Presigned URLS to download/upload objects
> Illustrates how to use the AWS SDK for Node.js (v3) to create *presigned URLs* to be able to download/upload objects without AWS credentials.

##### Usage

Run:

```bash
npm start {bucket} [{profile}]]
```

The script will list the contents of the given bucket. The example implements a loop so that more than 1000 objects can be listed.