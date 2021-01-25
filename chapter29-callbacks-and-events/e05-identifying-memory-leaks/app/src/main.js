import { EventEmitter } from 'events';
import { randomBytes } from 'crypto';


const eventEmitter = new EventEmitter();
eventEmitter.setMaxListeners(Infinity);
const listeners = [];

setInterval(() => {
  const bigRandomString = randomBytes(1000000).toString('hex');
  const listener = () => console.log(`str: ${ bigRandomString }`);
  listeners.push(listener);
  eventEmitter.on('evt', listener);
}, 50);

/* uncomment to fix the memory leak */
// this part will begin unregistering the listeners after 30 seconds
setTimeout(() => {
  setInterval(() => {
    const listener = listeners.shift();
    eventEmitter.removeListener('evt', listener);
  }, 50);
}, 30000);

setTimeout(() => {
  process.exit(0);
}, 120000);