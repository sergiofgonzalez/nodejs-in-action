import { ticker } from './lib/ticker.js';


/* 
if we register an error listener, the app may continue without crashing,
it that's what we want.
*/
ticker(500, (err, numTicks) => { 
  if (err) {
    console.log(`ERROR: ticker1 cb was done with ${ err.message }`);
    return;
  }
  console.log(`ticker1: ${ numTicks }`);
})
  .on('tick', () => console.log(`ticker1: tick!`))
  .on('error', err => console.log(`ERROR: ${ err.message }`));


/* 
if we don't register the listener, the app will crash as result on an
unhandled 'error' event
*/
ticker(500, (err, numTicks) => {
  if (err) {
    console.log(`ERROR: ticker2 cb was done with ${ err.message }`);
    return;
  }
  console.log(`ticker2: ${ numTicks }`);  
})
  .on('tick', () => console.log(`ticker2: tick!`));