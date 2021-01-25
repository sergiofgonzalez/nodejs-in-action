"use strict";

const net = require("net");

const server = net.createServer(clientSocket => {
  clientSocket.setNoDelay(true);
  const forceTelnetCharacterMode = new Buffer(6);
  forceTelnetCharacterMode[0] = 0o377;
  forceTelnetCharacterMode[1] = 0o375;
  forceTelnetCharacterMode[2] = 0o042;
  forceTelnetCharacterMode[3] = 0o377;
  forceTelnetCharacterMode[4] = 0o373;
  forceTelnetCharacterMode[5] = 0o001;
  clientSocket.write(forceTelnetCharacterMode, "binary");
  clientSocket.write("write some characters in your session\r\n"); 
  console.log("client connected");

  clientSocket.on("end", () => {
    console.log("client disconnected");
    server.unref(); // close the server when no clients are connected
  });


  clientSocket.on("data", data => {
    process.stdout.write(data.toString());
    clientSocket.write(data.toString());
  });
});

server.listen(5000, () => {
  console.log("Server bound to port 5000");
});