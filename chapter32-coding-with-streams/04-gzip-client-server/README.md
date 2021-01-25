# Part 4: Node.js avanced patterns and techniques
## Chapter 32 &mdash; Coding with streams
### 04 &mdash; GZIP client/server with streams
> an application consisting of a client and server components, on which the client *streams* a file in gzipped form to a remote server, who in turns decompresses and saves it in another location

#### Usage
The application features two components, the server part (`gzip-receive.js`) and the client part (`gzip-send.js`).

In order to use it you must first start the server part doing:

```bash
npm run start-receive
```

Then, you will be able to send files starting the client for a given file with the command:

```bash
npm run start-send <file>
```

If everything goes according to plan, you should receive a `201` HTTP status code on the sending part when the operation is complete, and on the `received_files/` directory you will find the file that was sent.