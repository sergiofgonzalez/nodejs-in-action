import { createWriteStream } from 'fs';
import { createLoggingWritable } from './lib/logging-writable.js';

const writable = createWriteStream('test.txt');
const writableProxy = createLoggingWritable(writable);

writableProxy.write('first chunk.');
writableProxy.write('second chunk.');
writable.write('third chunk: this will not be logged.');
writableProxy.end();
