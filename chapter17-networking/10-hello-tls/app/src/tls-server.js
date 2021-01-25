"use strict";

const fs = require("fs");
const tls = require("tls");
const path = require("path");

const options = {
  key: fs.readFileSync(path.join(__dirname, "rsrc", "server", "server.pem")),
  cert: fs.readFileSync(path.join(__dirname, "rsrc", "server", "server-cert.pem")),
  ca: [ fs.readFileSync(path.join(__dirname, "rsrc", "client","client-cert.pem")) ],
  requestCert: true
};

const server = tls.createServer(options, clearTextStream => {
  const authorized = clearTextStream.authorized ? "authorized" : "unauthorized";

  console.log(`Connected:`, authorized);
  clearTextStream.write("Hello to Jason Isaacs!\n");
  clearTextStream.setEncoding("utf8");
  clearTextStream.pipe(clearTextStream);
});

server.listen(5000, () => {
  console.log(`Secure TCP server listening on port`, 5000);
});