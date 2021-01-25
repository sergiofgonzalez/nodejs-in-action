import { ticker } from './lib/ticker.js';


ticker(175, (err, numTicks) => console.log(`ticker175: ${ numTicks }`))
  .on('tick', () => console.log(`ticker175: tick!`));