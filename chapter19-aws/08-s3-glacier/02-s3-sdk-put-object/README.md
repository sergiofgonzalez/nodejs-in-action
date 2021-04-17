# Part 2: Applications
## Chapter 19 &mdash; Amazon Web Services
### Section 8: Amazon S3 and Glacier
#### 02 &mdash; S3 SDK: `PutObject`
> Illustrates how to use the AWS SDK for Node.js (v3) to create objects in buckets

##### Usage

Run:

```bash
npm start node.js main {bucket} {path/to/local/file} [{profile}]
```

The script will upload the file to the specified bucket using the given profile (if given), or using the default if not given.