"use strict";

const net = require("net");
const util = require("util");

util.inspect.defaultOptions.depth = null;

let clients = 0;

const server = net.createServer(socket => {
  clients++;
  const clientId = clients;
  console.log("Client connected:", clientId);
  console.log(`${clients} client${clients != 1? "s" : "" } currently connected`);

  socket.on("end", () => {
    console.log("Client disconnected:", clientId);
  });

  socket.write(`Welcome client: ${ clientId }\r\n`);
  socket.pipe(socket); // echo the data back to the client
});

server.listen(5000, () => {
  console.log("Server started on port 5000");
});