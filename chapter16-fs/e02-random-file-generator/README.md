# e02-random-file-generator
> creating files with some random contents using Node.js file bulk API

## Description
A very simple application that generates some files with different number of records, format and sizes using an async approach but the file bulk API, which requires the file to be materialized prior to being written, which might be challenging for really large files.

**NOTE**
For a tool the generates the same types of files, by using Node's file streams API instead of files see [e02-random-file-generator](../../chapter15-streams/e02-streaming-random-file-generator/).