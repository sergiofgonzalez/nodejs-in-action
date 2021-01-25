import { RandomStream } from './lib/random-stream.js';

const randomStream = new RandomStream();

/* non-flowing mode */
randomStream
  .on('readable', () => {
    let chunk;
    while ((chunk = randomStream.read(16)) !== null) {
      console.log(`INFO: chunk read (${ chunk.length } bytes): '${ chunk.toString() }'`);
    }
  })
  .on('end', () => console.log(`INFO: end of stream. ${ randomStream.emittedBytes } bytes were emitted`));

/* flowing mode */
// randomStream
//   .on('data', chunk => {
//     console.log(`INFO: chunk read (${ chunk.length } bytes): '${ chunk.toString() }'`);
//   })
//   .on('end', () => console.log(`INFO: end of stream. ${ randomStream.emittedBytes } bytes were emitted`));


