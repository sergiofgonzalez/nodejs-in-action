"use strict";

const dgram = require("dgram");
const readline = require("readline");
const port = 41234;

function Client(remoteIpAddress) {
  const socket = dgram.createSocket("udp4");
  const r1 = readline.createInterface({ input: process.stdin, output: process.stdout });

  socket.send(new Buffer("<JOIN>"), 0, 6, port, remoteIpAddress);
  r1.setPrompt("Message> ");
  r1.prompt();

  r1
    .on("line", line => {
      sendData(line);
    })
    .on("close", () => {
      process.exit(0);
    });

  socket.on("message", (msg, rinfo) => {
    console.log(`\n< ${ rinfo.address } > ${ msg.toString() }`);
    r1.prompt();
  });

  function sendData(message) {
    socket.send(new Buffer(message), 0, message.length, port, remoteIpAddress, (err, numBytes) => {
      console.log(`Sent (${ numBytes } bytes): ${ message }`);
      r1.prompt();
    });
  }
}

function Server() {
  const clients = {};
  const server = dgram.createSocket("udp4");

  server.on("message", (msg, rinfo) => {
    const clientId = `${ rinfo.address }:${ rinfo.port }`;
    const message = msg.toString();
    if (!clients[clientId]) {
      clients[clientId] = rinfo;
    }

    if (message.match(/^</)) {
      console.log("Control message:", message);
      return;
    }

    for (let client in clients) {
      if (client !== clientId) {
        client = clients[client];
        server.send(new Buffer(message), 0, message.length, client.port, client.address, (err, numBytes) => {
          if (err) {
            console.error("Error sending message to client:", err.message);
            return;
          }
          console.log("Bytes sent:", numBytes);
        });
      }
    }
  });

  server.on("listening", () => {
    console.log("Server ready:", server.address());
  });

  server.bind(port);  
}

module.exports = {
  Client: Client,
  Server: Server
};

if (!module.parent) {
  switch (process.argv[2]) {
    case "client":
      new Client(process.argv[3]);
      break;

    case "server":
      new Server();
      break;
    
    default:
      console.log(`unknown option: expected [server|client remote_IP_address] received ${ process.argv[2] }`);
  }
}