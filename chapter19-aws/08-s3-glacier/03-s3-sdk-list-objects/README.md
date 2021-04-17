# Part 2: Applications
## Chapter 19 &mdash; Amazon Web Services
### Section 8: Amazon S3 and Glacier
#### 03 &mdash; S3 SDK: `ListObjects`
> Illustrates how to use the AWS SDK for Node.js (v3) to list the objects in a bucket

##### Usage

Run:

```bash
npm start {bucket} [{profile}]]
```

The script will list the contents of the given bucket. The example implements a loop so that more than 1000 objects can be listed.