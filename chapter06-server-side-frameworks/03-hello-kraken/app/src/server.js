"use strict";

const http = require("http");
const app = require("./index");



/*
  Create and start HTTP server
*/

const server = http.createServer(app);
server.listen(5000);
server.on("listening", () => console.log(`Server listening on port 5000`));
