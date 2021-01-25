import { createReadStream, createWriteStream } from 'fs';
import { pipeline } from 'stream';
import { createDecryptAndDecompress } from './lib/combined-streams.js';


const [ ,, password, source, ivHex ] = process.argv;
const destination = `${ source }.unenc`;

const iv = Buffer.from(ivHex, 'hex');

pipeline(
  createReadStream(source),
  createDecryptAndDecompress(password, iv),
  createWriteStream(destination),
  (err) => {
    if (err) {
      console.error(`ERROR: ${ err.message }`);
      process.exit(1);
    }
    console.log(`INFO: unarchive: ${ destination } created; iv='${ iv.toString('hex') }`);
  }
);