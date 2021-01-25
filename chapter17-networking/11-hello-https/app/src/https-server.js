"use strict";

const fs = require("fs");
const https = require("https");
const path = require("path");

const options = {
  key: fs.readFileSync(path.join(__dirname, "rsrc", "server", "server.pem")),
  cert: fs.readFileSync(path.join(__dirname, "rsrc", "server", "server-cert.pem")),
  ca: [ fs.readFileSync(path.join(__dirname, "rsrc", "client","client-cert.pem")) ],
  requestCert: true
};

const server = https.createServer(options, (req, res) => {
  const authorized = req.socket.authorized ? "authorized" : "unauthorized";
  res.writeHead(200);
  res.write(`Welcome, you are ${ authorized }!!!\n`);
  res.end();
});

server.listen(5000, () => {
  console.log("HTTPS server listening on port 5000");
});