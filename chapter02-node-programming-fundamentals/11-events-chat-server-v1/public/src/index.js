"use strict";

const events = require("events");
const net = require("net");

const channel = new events.EventEmitter();

channel.clients = {};       // channel client map (key=id, value = client socket)
channel.subscriptions = {}; // subscriptions map (key=id, value=subscription function)

/*
    Increase the number of listeners that can be registered to channel from 10 to 50
 */
channel.setMaxListeners(50);

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
  const welcomeMessageForSelf = `
  Congratulations! You've successfully joined the chat server.    
  Your id is: ${id}
  There are ${channel.listeners("broadcast").length} client(s) currently connected to the chat.\n`;
  clientSocket.write(welcomeMessageForSelf);

  channel.emit("broadcast", id, `A new client has connected to the chat: id = ${id}\n`);
});

/*
    Listener registration for the `leave` event
    + It will be executed when a client leaves the chat by closing the telnet connection
      As a result:
      + the broadcast listener for the leaving client will be deactivated
      + a broadcast message will be sent to the remaining clients notifying that a client has left the chat
 */
channel.on("leave", id => {
  channel.removeListener("broadcast", channel.subscriptions[id]);
  delete channel.subscriptions[id];
  delete channel.clients[id];
  channel.emit("broadcast", id, `${id} has left the chat\n`);
});

/*
    Listener for the `shutdown` event
    + It will be executed when one of the clients sends the message "shutdown"
    As a result:
      + All listeners will be removed
      + Note that TCP server will keep running
 */
channel.on("shutdown", () => {
  channel.emit("broadcast", " ", `The chat has been shut down.\n`);
  channel.removeAllListeners("broadcast");
  channel.subscriptions = {};
  channel.clients = {};
  console.log("Chat server has been closed as per user request.");
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
    const message = data.toString();
    if (message === "SHUTDOWN\r\n") {
      channel.emit("shutdown");
    } else {
      channel.emit("broadcast", id, data.toString());
    }
  });

  // register the listener for the clientSocket's close event
  // + we bridge it to the leave event which will remove the client from the chat
  clientSocket.on("close", () => channel.emit("leave", id));

  // register the listener for the error event, so that app handles errors gracefully
  clientSocket.on("error", (err) => new Error(`Unexpected error received from ${id}: ${err}`));
});

server.listen(8888);
console.log(`Waiting for incoming connections on port 8888`);
