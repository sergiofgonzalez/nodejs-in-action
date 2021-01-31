import { createVirtualFSAdapter } from './lib/virtual-fs-adapter.js';


const fs = createVirtualFSAdapter();

/* first test with real fs */

// test 1: read, then write same file
fs.writeFile('file.txt', 'Hello!', () => {
  fs.readFile('file.txt', { encoding: 'utf8' }, (err, res) => {
    if (err) {
      return console.error(err);
    }
    console.log(`TEST1-FS: `, res);
  });
});

// test 2: try to read missing file
// eslint-disable-next-line no-unused-vars
fs.readFile('missing.txt', { encoding: 'utf8' }, (err, res) => {
  console.error(`TEST2-FS: `, err);
});
