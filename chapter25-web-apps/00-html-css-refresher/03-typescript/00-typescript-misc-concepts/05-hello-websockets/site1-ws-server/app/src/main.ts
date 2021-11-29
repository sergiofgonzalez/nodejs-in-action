import express from 'express';
import { Socket } from 'net';
import WebSocket from 'ws';

const PORT: number = Number(process.env.PORT) || 5050;
const app = express();

export const server = app.listen(PORT, () => {
  console.log(`INFO: server listening on PORT ${ PORT }`);
});

const wsServer = new WebSocket.Server({
  noServer: true  // reuse Express HTTP server
});

wsServer.on('connection', ws => {
  ws.on('message', (msg) => {
    wsServer.clients.forEach((client) => {
      if (client.readyState === WebSocket.OPEN) {
        console.log(`INFO: sending message to client: ${ msg }`);
        client.send(msg.toString());
      }
    });
  });
});

server.on('upgrade', async (request, socket, head) => {
  console.log(`INFO: 'upgrade' request received`);
  // fabricated authentication error for 50% of the requests
  if (Math.random() > 0.5) {
    console.error(`ERROR: sending unauthorized to client upgrade request`);
    return socket.end(`HTTP/1.1 401 Unauthorized\r\n`, 'ascii');
  }

  // emit 'connection' event when request accepted
  wsServer.handleUpgrade(request, socket as Socket, head, (ws) => {
    console.log(`INFO: client upgrade was accepted: emitting internal 'connection' event`);
    wsServer.emit('connection', ws, request);
  });
});

