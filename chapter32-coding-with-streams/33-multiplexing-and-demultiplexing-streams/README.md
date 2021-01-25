# Part 4: Node.js avanced patterns and techniques
## Chapter 32 &mdash; Coding with streams
### 33 &mdash; Multiplexing and demultiplexing streams
> Illustrates how to perform stream multiplexing and demultiplexing with a remote logger application. In the application, the client side pipes *stdout* and *stderr* into a common channel, that is then demultiplexed on the server side and piped into two different files.

#### Usage

To start the server part run: `npm run start-server`. That will start a TCP server on port 3000, then, for each of the demultiplexed channels two files will be created.

To start the client part run: `npm run start-client`. That will create a child process for `generate-data.js` that will send some information from the client to the server.