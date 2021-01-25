# Part 4: Node.js avanced patterns and techniques
## Chapter 32 &mdash; Coding with streams
### 05 &mdash; GZIP client/server with streams, with an encryption layer
> an enhancement on [04 &mdash; GZIP client/server with streams](../04-gzip-client-server) which adds an extra layer of encryption to demonstrate the power of streams composability

#### Usage
The application features two components, the server part (`gzip-receive.js`) and the client part (`gzip-send.js`).

In order to use it you must first start the server part doing:

```bash
npm run start-receive
```

As part of the server initialization, a secret key will be generated, and displayed on the console:

```
INFO: secret generated: clients must use 'bddcc84d8d67b8173eefed6badb8a52de4a4a7f92773135d' when sending files
```

Then, you will be able to send files starting the client for a given file with the command:

```bash
npm run start-send <file> <secret>
```

If everything goes according to plan, you should receive a `201` HTTP status code on the sending part when the operation is complete, and on the `received_files/` directory you will find the file that was sent.