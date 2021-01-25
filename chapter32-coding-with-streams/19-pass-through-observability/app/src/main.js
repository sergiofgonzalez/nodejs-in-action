import { PassThrough } from 'stream';

let bytesWritten = 0;
const monitor = new PassThrough();
monitor.on('data', chunk => { bytesWritten += chunk.length; } );
monitor.on('finish', () => console.log(`INFO: ${ bytesWritten } bytes written`));

monitor.write('Hello!');
monitor.end();