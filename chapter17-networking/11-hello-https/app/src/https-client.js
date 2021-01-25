"use strict";

const os = require("os");
const fs = require("fs");
const https = require("https");
const path = require("path");

const options = {
  key: fs.readFileSync(path.join(__dirname, "rsrc", "client", "client.pem")),
  cert: fs.readFileSync(path.join(__dirname, "rsrc", "client", "client-cert.pem")),
  ca: [ fs.readFileSync(path.join(__dirname, "rsrc", "server","server-cert.pem")) ],
  servername: os.hostname(),
  port: 5000,
  path: "/",
  method: "GET"
};


const req = https.request(options, res => {
  res.on("data", chunk => {
    console.log(`Client received data: ${ chunk }`);
  });
});

req.end();

req.on("error", err => {
  console.log("Client received error:", err.message);
});