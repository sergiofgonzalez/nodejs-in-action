"use strict";

const net = require("net");
const assert = require("assert");

let clients = 0;
let expectedAssertions = 2;

const server = net.createServer(socket => {
  clients++;
  const clientId = clients;
  console.log("Client connected: client#:", clientId);

  socket.on("end", () => {
    console.log(`Client ${clientId} has disconnected`);
  });

  socket.write(`Welcome client ${ clientId }: there are other ${ clients - 1 } client(s) connected to the server\r\n`);
  socket.pipe(socket);
});

server.listen(5000, () => {
  console.log("Server started and listening on port 5000");
 
  runTest(1, 0, () => {
    runTest(2, 1, () => {
      console.log("Tests completed");
      assert.equal(0, expectedAssertions);
      server.close();
    });
  });
});

function runTest(expectedId, expectedClients, done) {
  const socket = net.connect(5000);

  socket.on("data", data => {
    const expected = `Welcome client ${ expectedId }: there are other ${ expectedClients } client(s) connected to the server\r\n`;
    assert.equal(data.toString(), expected);
    expectedAssertions--;
    socket.end();
  });

  socket.on("end", done);
}