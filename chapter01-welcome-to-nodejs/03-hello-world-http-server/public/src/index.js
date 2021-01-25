"use strict";

const http = require("http");
const port = 5000;

const server = http.createServer((request, response) => {
  response.end("Hello, world!");
});

server.listen(port, () => {
  console.log(`Server established and listening on port ${port}`);
});