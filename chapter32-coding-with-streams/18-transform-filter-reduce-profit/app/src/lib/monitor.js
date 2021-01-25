import { PassThrough } from 'stream';

let bytesWritten = 0;
export const monitor = new PassThrough();
monitor.on('data', chunk => { bytesWritten += chunk.length; });
monitor.on('finish', () => console.log(`${ bytesWritten } bytes written`));
