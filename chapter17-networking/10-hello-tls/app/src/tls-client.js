"use strict";

const os = require("os");
const fs = require("fs");
const tls = require("tls");
const path = require("path");

const options = {
  key: fs.readFileSync(path.join(__dirname, "rsrc", "client", "client.pem")),
  cert: fs.readFileSync(path.join(__dirname, "rsrc", "client", "client-cert.pem")),
  ca: [ fs.readFileSync(path.join(__dirname, "rsrc", "server","server-cert.pem")) ],
  servername: os.hostname()
};

const clearTextStream = tls.connect(5000, options, () => {
  const authorized = clearTextStream.authorized ? "authorized" : "unauthorized";
  console.log(`Client connected:`, authorized);
  process.stdin.pipe(clearTextStream);
});

clearTextStream.setEncoding("utf8");

clearTextStream.on("data", chunk => {
  console.log(`client received data:`, chunk);
});