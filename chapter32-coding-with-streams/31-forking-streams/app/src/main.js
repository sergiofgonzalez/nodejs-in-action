import { createReadStream, createWriteStream } from 'fs';
import { createHash } from 'crypto';

const filename = process.argv[2] ?? 'package.json';
const sha1Stream = createHash('sha1').setEncoding('hex');
const md5Stream = createHash('md5').setEncoding('hex');
const inputStream = createReadStream(filename);

inputStream
  .pipe(sha1Stream)
  .pipe(createWriteStream(`sample_files/${ filename }.sha1`));

inputStream
  .pipe(md5Stream)
  .pipe(createWriteStream(`sample_files/${ filename }.md5`));
