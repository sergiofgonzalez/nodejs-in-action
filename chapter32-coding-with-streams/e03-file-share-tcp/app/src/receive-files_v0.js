import { createServer } from 'net';
import { pipeline } from 'stream/promises';
import { StreamMonitor } from './lib/stream-monitor.js';
import { createWriteStream } from 'fs';

const server = createServer(async (socket) => {
  console.log(`INFO: receive-files: accepted new connection for file transfer`);
  const streamMonitor = new StreamMonitor();
  await pipeline(
    socket,
    streamMonitor,
    createWriteStream(`sample_files/out.txt`)
  );
  console.log(`INFO: receive-files: file reception completed: process took ${ streamMonitor.duration } ns, bytes: ${ streamMonitor.bytesTransferred }`);
});

server
  .listen(5000, () => console.log(`INFO: receive-files: TCP server started on localhost:5000`))
  .on('error', (err) => {
    console.error(`ERROR: receive-files: TCP connection error: ${ err.message }: aborting`);
    process.exit(1);
  });
