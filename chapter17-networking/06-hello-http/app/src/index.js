"use strict";

const http = require("http");
const assert = require("assert");

const server = http.createServer((req, res) => {
  res.writeHead(200, { "Content-Type": "text/plain" });
  res.write("Hello to Jason Isaacs\r\n");
  res.end();
});

server.listen(5000);


const req = http.request({ port: 5000 }, res => {
  console.log("HTTP headers:", res.headers);
  res.on("data", data => {
    console.log(`HTTP Status code: ${ res.statusCode } (${ http.STATUS_CODES[res.statusCode] })`);
    console.log("Body:", data.toString());
    assert.equal(data.toString(), "Hello to Jason Isaacs\r\n");
    assert.equal(200, res.statusCode);
    server.unref();
  });
});

req.end();