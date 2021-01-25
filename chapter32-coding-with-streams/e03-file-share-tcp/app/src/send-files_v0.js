import { connect } from 'net';
import { pipeline } from 'stream/promises';
import { createReadStream } from 'fs';
import { StreamMonitor } from './lib/stream-monitor.js';

const inputFile = process.argv[2] ?? 'README.md';


const socket = connect(5000, async () => {
  const streamMonitor = new StreamMonitor();
  console.log(`INFO: send-files: About to send file`);
  try {
    await pipeline(
      createReadStream(inputFile),
      streamMonitor,
      socket
    );
    console.log(`INFO: send-files: file sent: process took: ${ streamMonitor.duration } ns, bytes: ${ streamMonitor.bytesTransferred }`);
  } catch (err) {
    console.error(`ERROR: send-files: could not send file: ${ err.message }`);
    process.exit(1);
  }
});

socket
  .on('error', (err) => {
    console.error(`ERROR: send-files: TCP connection error: ${ err.message }: aborting`);
    process.exit(1);
  });