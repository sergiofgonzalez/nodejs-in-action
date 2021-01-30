import { createTimestampedConsole } from './lib/timestamped-console.js';
import { greetMe } from './lib/greeter.js';

const timestampedConsole = createTimestampedConsole(console);


timestampedConsole.log(`hello, world!`);
timestampedConsole.log(`How come world never *hellos* me back`, { type: 'question' });

console.log(`hello to Jason Isaacs!`);
console.log(`hello to chuckles`, { info: 'it is Branagh'});


greetMe('Idris');

console.debug(`This is a debug line`);
console.error(`This is an error line`);
console.info(`This is an info line`);