import { pipeline } from 'stream';
import { createReadStream, createWriteStream } from 'fs';
import split from 'split';
import superagent from 'superagent';
import parallelTransform from 'parallel-transform';

pipeline(
  createReadStream(process.argv[2]),
  split(),
  parallelTransform(2, { ordered: true },
    async function (url, done) {
      if (!url) {
        return done;
      }
      console.log(`INFO: processing ${ url }`);
      try {
        await superagent.head(url, { timeout: 5 * 1000 });
        this.push(`${ url } is up\n`);
      } catch (err) {
        this.push(`${ url } is down\n`);
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