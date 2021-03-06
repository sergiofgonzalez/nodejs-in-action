import { app } from './app.js';
import http from 'http';
import { buildLogger } from './lib/logger.js';

const logger = buildLogger('main');


logger.info(`Starting HTTP server application`);

const port = normalizePort(process.env.PORT || 5000);
app.set('port', port);

/*
  Create HTTP server
*/
const server = http.createServer(app);

server.listen(port);
server.on('error', onError);
server.on('listening', onListening);

function normalizePort(val) {
  const port = parseInt(val, 10);
  if (isNaN(port)) {
    return val; // must be named pipe
  }

  if (port >= 0) {
    return port;
  }

  return false;
}


function onError(error) {
  if (error.syscall !== 'listen') {
    throw error;
  }

  const bind = typeof port === 'string' ? `Pipe ${ port }` : `Port ${ port }`;

  switch (error.code) {
    case 'EACCESS':
      console.error(`${ bind } requires elevated privileges`);
      process.exit(1);
      break;

    case 'EADDRINUSE':
      console.error(`${ bind } is already in use`);
      process.exit(1);
      break;

    default:
      throw error;
  }
}

function onListening() {
  const addr = server.address();
  const bind = typeof addr === 'string' ? `Pipe ${ port }` : `${ server.address().address}:${ addr.port }`;
  logger.info(`Listening on ${ bind }`);
}
