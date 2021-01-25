import { createServer } from 'http';
import { createWriteStream } from 'fs';
import { createGunzip } from 'zlib';
import path from 'path';
import { createDecipheriv, randomBytes } from 'crypto';

const secret = randomBytes(24);
console.log(`INFO: secret generated: clients must use '${ secret.toString('hex') }' when sending files`);


const server = createServer((req, res) => {
  const filename = path.basename(req.headers['x-filename']);
  const destFilename = path.join('received_files', filename);
  const iv = Buffer.from(req.headers['x-initialization-vector'], 'hex');
  console.log(`INFO: file request received: ${ filename }`);

  req
    .pipe(createDecipheriv('aes192', secret, iv))
    .pipe(createGunzip())
    .pipe(createWriteStream(destFilename))
    .on('finish', () => {
      res.writeHead(201, { 'Content-Type': 'text/plain' });
      res.end('OK\n');
      console.log(`INFO: file saved: ${ destFilename }`);
    });
});

server.listen(5000, () => console.log(`INFO: listening on http://localhost:5000`));