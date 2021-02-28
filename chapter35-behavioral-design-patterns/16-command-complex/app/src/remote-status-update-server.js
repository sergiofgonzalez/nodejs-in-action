import http from 'http';
import { createPostStatusCmd } from './lib/create-post-status-cmd.js';
import { statusUpdateService } from './lib/status-update-service.js';
import { Invoker } from './lib/invoker.js';


const server = http.createServer((req, res) => {
  if (req.method === 'POST' && req.url === '/cmd') {
    let requestBody = '';
    req
      .on('data', (chunk) => {
        requestBody += chunk.toString();
      })
      .on('end', () => {
        let statusMessage;
        try {
          statusMessage = JSON.parse(requestBody)?.json?.status;
        } catch (err) {
          res
            .writeHead(400, 'Unrecognized format')
            .end();
        }

        try {
          const invoker = new Invoker();
          const command = createPostStatusCmd(statusUpdateService, statusMessage);
          invoker.run(command);
          res
            .writeHead('200')
            .end();

        } catch (err) {
          res
            .writeHead(500, 'Could not post status received remotely')
            .end();
        }
      });
  } else {
    res.writeHead(404);
    res.end();
  }
});

server.listen(3000, () => {
  console.log(`INFO: remote-server: Server listening on port 3000`);
});

