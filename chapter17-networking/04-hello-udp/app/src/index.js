"use strict";

const dgram = require("dgram");
const fs = require("fs");
const port = 41230;
const defaultSize = 16;

function Client(remoteIpAddress) {
  const inStream = fs.createReadStream(__filename);
  const socket = dgram.createSocket("udp4");

  inStream.on("readable", sendData);

  function sendData() {
    const message = inStream.read(defaultSize);
    if (!message) {
      return socket.unref();
    }

    socket.send(message, 0, message.length, port, remoteIpAddress, (err, bytes) => {
      console.log(`Sending data ${ bytes } byte(s) of data: ${ message }`, bytes);
      sendData();
    });
  }
}

function Server() {
  const socket = dgram.createSocket("udp4");

  socket.on("message", (message, rinfo) => {    
    console.log("Received message from the client:", rinfo);
    console.log(message.toString());
  });

  socket.on("listening", () => {
    console.log("UDP server listening:", socket.address());
  });

  socket.bind(port);
}

if (process.argv[2] === "client") {
  console.log("starting client...");
  new Client(process.argv[3]);
} else {
  console.log("starting server...");
  new Server();
}