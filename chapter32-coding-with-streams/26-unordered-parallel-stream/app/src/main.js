import { pipeline } from 'stream';
import { createReadStream, createWriteStream } from 'fs';
import split from 'split';
import superagent from 'superagent';
import { ParallelStream } from './lib/parallel-stream.js';

pipeline(
  createReadStream(process.argv[2]),
  split(),
  new ParallelStream(
    async (url, encoding, push, done) => {
      if (!url) {
        return done;
      }
      try {
        await superagent.head(url, { timeout: 5 * 1000 });
        push(`${ url } is up\n`);
      } catch (err) {
        push(`${ url } is down\n`);
      }
      done();
    }
  ),
  createWriteStream('results.txt'),
  (err) => {
    if (err) {
      console.error(`ERROR: ${ err.message }`);
      process.exit(1);
    }
    console.log(`INFO: All URLs have been checked!`);
  }
);