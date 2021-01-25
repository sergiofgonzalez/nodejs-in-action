# Part 4: Node.js avanced patterns and techniques
## Chapter 32 &mdash; Coding with streams
### 20 &mdash; Late piping using `PassThrough` stream to upload a file
> Illustrates how to implement late piping with a `PassThrough` stream to solve scenarios on which we need to provide a stream to an API, but we need to operate on the stream before handing out the chunks to that API.

#### Usage
First of all, you need to start the server part doing `npm run start-server`. That will start a simple HTTP server that accepts requests to upload files sent as streams.

Then, you can start the client which sends an image using an existing known API `upload(...)`.

As the file we want to upload we want to compress it and send it in streaming mode, we need to use a `PassThrough`.
