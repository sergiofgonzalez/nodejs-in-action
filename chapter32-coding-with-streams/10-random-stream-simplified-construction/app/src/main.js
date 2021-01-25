import { Readable } from 'stream';
import Chance from 'chance';

const chance = new Chance();
let emittedBytes = 0;

const randomStream = new Readable({
  read(size) {
    const chunk = chance.string({ length: size });
    this.push(chunk, 'utf8');
    emittedBytes += chunk.length;
    if (chance.bool({ likelihood: 5 })) {
      this.push(null);
    }
  }
});


/* non-flowing mode */
// randomStream
//   .on('readable', () => {
//     let chunk;
//     while ((chunk = randomStream.read(16)) !== null) {
//       console.log(`INFO: chunk read (${ chunk.length } bytes): '${ chunk.toString() }'`);
//     }
//   })
//   .on('end', () => console.log(`INFO: end of stream. ${ emittedBytes } bytes were emitted`));

/* flowing mode */
randomStream
  .on('data', chunk => {
    console.log(`INFO: chunk read (${ chunk.length } bytes): '${ chunk.toString() }'`);
  })
  .on('end', () => console.log(`INFO: end of stream. ${ emittedBytes } bytes were emitted`));
