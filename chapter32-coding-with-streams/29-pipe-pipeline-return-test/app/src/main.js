import { createReadStream, createWriteStream } from 'fs';
import { Transform, pipeline } from 'stream';
import { strict as assert } from 'assert';

const streamA = createReadStream('package.json');
const streamB = new Transform({
  transform(chunk, encoding, done) {
    this.push(chunk.toString().toUpperCase());
    done();
  }
});
const streamC = createWriteStream(`PACKAGE-UPPERCASE.JSON`);

const pipelineReturn = pipeline(
  streamA,
  streamB,
  streamC,
  (err) => {
    if (err) {
      console.error(`ERROR: ${ err.message }`);
      process.exit(1);
    }
    assert.strictEqual(streamC, pipelineReturn);
  }
);

const pipeReturn = streamA
  .pipe(streamB)
  .pipe(streamC);
assert.strictEqual(streamC, pipeReturn);