import { createWriteStream, createReadStream } from 'fs';
import { Readable, Transform } from 'stream';

export function concatFiles(dest, files) {
  return new Promise((resolve, reject) => {
    const destStream = createWriteStream(dest);
    Readable.from(files)
      .pipe(new Transform({
        objectMode: true,
        transform(filename, encoding, done) {
          const src = createReadStream(filename);
          src.pipe(destStream, { end: false });
          src.on('error', done);
          src.on('end', done);
        }
      }))
      .on('error', reject)
      .on('finish', () => {
        destStream.end();
        resolve();
      });
  });
}
