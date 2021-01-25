import { ImmutableBuffer } from './lib/immutable-buffer.js';

const hello = 'Hello!';
const immutable = new ImmutableBuffer(hello.length, ({ write }) => {
  write(hello);
});

console.log(String.fromCharCode(immutable.readInt8(0)));

try {
  immutable.write('Hello to Jason Isaacs!');
} catch (err) {
  console.error('ERROR: ', err.message);
}

console.log(immutable.toString('hex'));