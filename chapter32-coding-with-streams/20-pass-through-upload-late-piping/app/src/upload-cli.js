import { createReadStream } from 'fs';
import { createBrotliCompress } from 'zlib';
import { PassThrough } from 'stream';
import { basename } from 'path';
import { upload } from './lib/upload.js';

const filepath = process.argv[2] || 'images_to_upload/backpressure.png';
const filename = basename(filepath);
const contentStream = new PassThrough();

upload(`${ filename }.br`, contentStream)
  .then(response => console.log(`INFO: upload: server responded with: ${ response.data }`))
  .catch(err => {
    console.error(`ERROR: upload: ${ err.message }`);
    process.exit(1);
  });


createReadStream(filepath)
  .pipe(createBrotliCompress())
  .pipe(contentStream);
