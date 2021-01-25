import { createWriteStream } from 'fs';
import { createServer } from 'net';

function demultiplexChannel(source, destinations) {
  let currentChannel = null;
  let currentLength = null;

  source
    .on('readable', () => {
      let chunk;
      if (currentChannel === null) {
        chunk = source.read(1);
        currentChannel = chunk?.readUInt8(0);
      }
      if (currentLength === null) {
        chunk = source.read(4);
        currentLength = chunk?.readUInt32BE(0);
        if (currentLength === null) {
          return null;
        }
      }

      chunk = source.read(currentLength);
      if (chunk === null) {
        return null;
      }

      console.log(`INFO: demultiplexChannel: received packet from ${ currentChannel }`);
      destinations[currentChannel].write(chunk);
      currentChannel = null;
      currentLength = null;
    })
    .on('end', () => {
      destinations.forEach(destination => destination.end());
      console.log(`INFO: demultiplexChannel: source channel closed`);
    });
}

const server = createServer(socket => {
  const stdoutStream = createWriteStream('sample_files/stdout.log');
  const stderrStream = createWriteStream('sample_files/stderr.log');
  demultiplexChannel(socket, [stdoutStream, stderrStream]);
});

server.listen(5000, () => console.log(`INFO: server: server started on localhost:5000`));