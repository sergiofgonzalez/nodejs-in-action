import { FailsafeSocket } from './lib/fail-safe-socket.js';

const failsafeSocket = new FailsafeSocket({ port: 5000 });

setInterval(() => {
  failsafeSocket.send(process.memoryUsage());
}, 2500);
