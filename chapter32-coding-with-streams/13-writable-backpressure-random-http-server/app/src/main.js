import { createServer } from 'http';
import Chance from 'chance';

const chance = new Chance();

const server = createServer((req, res) => {
  res.writeHead(200, { 'Content-Type': 'text/plain' });

  function generateMore() {
    while (chance.bool({ likelihood: 95 })) {
      const randomChunk = chance.string({ length: 16 * 1024 - 1 });
      const shouldContinue = res.write(`${ randomChunk }\n`);
      if (!shouldContinue) {
        console.log(`WARNING: backpressure building up on the stream!`);
        return res.once('drain', generateMore);
      }
    }
    res.end(`\n\n`);
  }
  generateMore();
  res.on('finish', () => console.log(`INFO: All data sent!`));
});

server.listen(5000, () => console.log(`INFO: listening on http://localhost:5000`));
