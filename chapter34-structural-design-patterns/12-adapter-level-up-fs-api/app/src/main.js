/* eslint-disable no-unused-vars */
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';
import level from 'level';
import { createFSAdapter } from './lib/fs-adapter.js';
import fs from 'fs';

const __dirname = dirname(fileURLToPath(import.meta.url));
const db = level(join(__dirname, 'db'), { valueEncoding: 'binary' });

const dbfs = createFSAdapter(db);

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
fs.readFile('missing.txt', { encoding: 'utf8' }, (err, res) => {
  console.error(`TEST2-FS: `, err);
});

// test3: same as test1, but using db as the backend
dbfs.writeFile('file.txt', 'Hello!', () => {
  dbfs.readFile('file.txt', { encoding: 'utf8' }, (err, res) => {
    if (err) {
      return console.error(err);
    }
    console.log(`TEST1-DB: `, res);
  });
});

// test 4: same as test2 but using db as the backend
dbfs.readFile('missing.txt', { encoding: 'utf8' }, (err, res) => {
  console.error(`TEST2-DB: `, err);
});