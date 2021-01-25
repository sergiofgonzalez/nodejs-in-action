import { join } from 'path';
import { ToFileStream } from './lib/to-file-stream.js';

const toFileStream = new ToFileStream();

toFileStream.write({ path: join('sample_files', 'file1.txt'), content: 'Hello' });
toFileStream.write({ path: join('sample_files', 'file2.txt'), content: 'to' });
toFileStream.write({ path: join('sample_files', 'dir1', 'file3.txt'), content: 'Jason Isaacs' });

// end() signals that no more data will be written to the stream
toFileStream.end(() => console.log(`INFO: All files created`));