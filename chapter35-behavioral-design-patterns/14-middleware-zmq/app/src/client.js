import zeromq from 'zeromq';
import { ZmqMiddlewareManager } from './lib/zmq-middleware-manager.js';
import { jsonMiddleware } from './lib/middlewares/json-middleware.js';
import { zlibMiddleware } from './lib/middlewares/zlib-middleware.js';

async function main() {
  const socket = new zeromq.Request();
  await socket.connect('tcp://127.0.0.1:5000');

  const zmqm = new ZmqMiddlewareManager(socket);
  zmqm.use(zlibMiddleware());
  zmqm.use(jsonMiddleware());
  zmqm.use({
    inbound(message) {
      console.log(`INFO: client: echoed back: `, message);
      return message;
    }
  });


  setInterval(() => {
    zmqm.send({ action: 'ping', echo: Date.now() })
      .catch(err => console.error(`ERROR: client: ${ err.message }`));
  }, 1000);

  console.log(`INFO: client: connected to tcp://127.0.0.1:5000`);
}

main()
  .catch(err => console.error(`ERROR: client: ${ err.message }`));
