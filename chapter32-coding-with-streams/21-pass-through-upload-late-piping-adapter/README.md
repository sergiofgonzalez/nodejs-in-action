# Part 4: Node.js avanced patterns and techniques
## Chapter 32 &mdash; Coding with streams
### 21 &mdash; Late piping using `PassThrough` stream to upload a file, using an adapter
> An alternative implementation for [20 &mdash; Late piping using `PassThrough` stream to upload a file](20-pass-through-upload-late-piping) on which we create a function that returns a writable stream and use it to push data to the existing `upload()` API.

#### Usage
First of all, you need to start the server part doing `npm run start-server`. That will start a simple HTTP server that accepts requests to upload files sent as streams.

Then, you can start the client which sends chunks of data that will end up being written on the remote server, leveraging the existing API `upload(...)`.
