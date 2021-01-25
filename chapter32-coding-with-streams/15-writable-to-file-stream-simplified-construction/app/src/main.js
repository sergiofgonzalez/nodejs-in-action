import { join } from 'path';
import { Writable } from 'stream';
import { promises as fs } from 'fs';
import { dirname } from 'path';
import mkdirp from 'mkdirp';

const toFileStream = new Writable({
  objectMode: true,
  write(chunk, encoding, cb) {
    mkdirp(dirname(chunk.path))
      .then(() => fs.writeFile(chunk.path, chunk.content))
      .then(() => cb())
      .catch(cb);
  }
});

toFileStream.write({ path: join('sample_files', 'file1.txt'), content: 'Hello' });
toFileStream.write({ path: join('sample_files', 'file2.txt'), content: 'to' });
toFileStream.write({ path: join('sample_files', 'dir1', 'file3.txt'), content: 'Jason Isaacs' });

// end() signals that no more data will be written to the stream
toFileStream.end(() => console.log(`INFO: All files created`));