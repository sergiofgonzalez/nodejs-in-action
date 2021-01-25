import { createServer } from 'http';
import { createWriteStream } from 'fs';
import { basename, join } from 'path';

const server = createServer((req, res) => {
  const filename = basename(req.headers['x-filename']);
  const destFilename = join('received_files', filename);
  req
    .pipe(createWriteStream(destFilename))
    .on('finish', () => {
      res.writeHead(201, { 'Content-Type': 'text/plain' });
      res.end(`OK\n`);
      console.log(`INFO: server: file saved: ${ destFilename }`);
    });
});

server.listen(5000, () => console.log(`INFO: server: listening on http://localhost:5000`));
