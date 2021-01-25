import { createReadStream, createWriteStream } from 'fs';
import { pipeline } from 'stream';
import { randomBytes } from 'crypto';
import { createCompressAndEncrypt } from './lib/combined-streams.js';

const [ ,, password, source ] = process.argv;
const iv = randomBytes(16);
const destination = `${ source }.gz.enc`;

pipeline(
  createReadStream(source),
  createCompressAndEncrypt(password, iv),
  createWriteStream(destination),
  (err) => {
    if (err) {
      console.error(`ERROR: ${ err.message }`);
      process.exit(1);
    }
    console.log(`INFO: archive: ${ destination } created; iv='${ iv.toString('hex') }`);
  }
);