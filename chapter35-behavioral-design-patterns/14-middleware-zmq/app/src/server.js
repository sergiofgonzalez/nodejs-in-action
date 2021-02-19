import zeromq from 'zeromq';
import { ZmqMiddlewareManager } from './lib/zmq-middleware-manager.js';
import { jsonMiddleware } from './lib/middlewares/json-middleware.js';
import { zlibMiddleware } from './lib/middlewares/zlib-middleware.js';

async function main() {
  const socket = new zeromq.Reply();
  await socket.bind('tcp://127.0.0.1:5000');

  const zmqm = new ZmqMiddlewareManager(socket);

  // inbound: deflate first, then deserialize
  // outbound: serialize first, then compress
  zmqm.use(zlibMiddleware());
  zmqm.use(jsonMiddleware());
  zmqm.use({
    async inbound(message) {
      console.log(`INFO: server: Received: `, message);
      if (message.action === 'ping') {
        await this.send({ action: 'pong', echo: message.echo });
      }
      return message;
    }
  });

  console.log(`INFO: server started on tcp://127.0.0.1:5000`);
}

main()
  .then(() => console.log(`INFO: server: done!`))
  .catch((err) => console.log(`ERROR: server: ${ err.message }`));
