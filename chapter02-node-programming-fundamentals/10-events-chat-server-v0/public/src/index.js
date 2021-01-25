"use strict";

const events = require("events");
const net = require("net");

const channel = new events.EventEmitter();

channel.clients = {};       // channel client map (key=id, value = client socket)
channel.subscriptions = {}; // subscriptions map (key=id, value=subscription function)

/* 
  Listener for the join events
  + It will be executed each time someone establishes a connection to the TCP server.
  + It receives as parameters an id consisting of the remote address and port, and the
    socket object for that client.
*/
channel.on("join", (id, clientSocket) => {

  // add the new client to the map of connected clients
  channel.clients[id] = clientSocket;

  // register the subscription function for this client
  // It consists in sending the received message to all connected
  // clients except for the one that originated the message
  channel.subscriptions[id] = (senderId, message) => {
    if (id !== senderId) {
      channel.clients[id].write(message);
    }
  };

  // register the listener for the broadcast event for this client id
  channel.on("broadcast", channel.subscriptions[id]);

  // notify the client of its id (for tagging purposes)
  clientSocket.write(`Congratulations! You've successfully joined the chat server. Your id is: ${id}\n`);
});



/*
  Create a new TCP server for the chat
    + The `createServer` function receives as a parameter a function that 
      will be activated with each new clientSocket that connects to the server
 */
console.log("Establishing the chat server");
const server = net.createServer(clientSocket => {
  const id = `${clientSocket.remoteAddress}:${clientSocket.remotePort}`;
  console.log(`A new connection has been received: ${id}`);

  // emit the `join` event for the new client
  channel.emit("join", id, clientSocket);

  // register a listener for the clientSocket's data event
  //  + we bridge the `data` event to a channel's `broadcast` event, which will
  // ultimately send the message to the rest of the connected clients
  clientSocket.on("data", data => {
    channel.emit("broadcast", id, data.toString());
  });
});

server.listen(8888);
console.log(`Waiting for incoming connections on port 8888`);
