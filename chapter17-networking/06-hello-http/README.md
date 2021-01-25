# 06-hello-http
> creating an HTTP server and making a simple request using Node.js

## Description
This example illustrates how to set up an *HTTP server* and an *HTTP client* in the same program.

These are the interesting bits of the example:
+ Server:
  + `http.createServer((req, res) => {...})` &mdash; Creates a new server object
  + `res.write` &mdash; writes the response to the underlying *TCP socket*
  + `res.writeHead` &mdash; writes HTTP headers to the request
  + `res.end` &mdash; signals the server that all of the response headers and body have been sent, so the server can consider this message complete.
  + `server.listen` &mdash; sets the server to listener on the given port
  + `server.unref` &mdash; cleans the resources associated to the HTTP server when no more clients are connected.

+ Client:
  + `http.request(options, res => {...})` &mdash; create new connection to a server. It accepts an `options` object and a callback that will be executed when the connection is made. Note that we need to set up a `"data"` event listener to get access to the information sent from the server.
  ```javascript
  const req = http.request({ port: 5000 }, res => {
    res.on("data", data => {
      ...
    });
  });
  ```
  + `req.end` &mdash; Finishes ending the request. If any parts of the body are unsent, it will flush them to the stream. If the request is chunked, this will send the terminating sequence `"0\r\n\r\n"`.

