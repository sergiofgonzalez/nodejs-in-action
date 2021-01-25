import { request } from 'http';
import { createGzip } from 'zlib';
import { createReadStream } from 'fs';
import path from 'path';
import { createCipheriv, randomBytes } from 'crypto';

const secret = Buffer.from(process.argv[3], 'hex');
const iv = randomBytes(16);

const filename = process.argv[2];

const httpRequestOptions = {
  hostname: 'localhost',
  port: 5000,
  path: '/',
  method: 'PUT',
  headers: {
    'Content-Type': 'application/octet-stream',
    'Content-Encoding': 'gzip',
    'X-Filename': path.basename(filename),
    'X-Initialization-Vector': iv.toString('hex')
  }
};

const req = request(httpRequestOptions, res => {
  console.log(`INFO: Server responded with: ${ res.statusCode }`);
});

createReadStream(filename)
  .pipe(createGzip())
  .pipe(createCipheriv('aes192', secret, iv))
  .pipe(req)
  .on('finish', () => console.log(`INFO: file ${ filename } successfully sent`));