import { readFile } from 'fs';  // using named import of readFile
import * as fs from 'fs';       // namespace import
import fsDefault from 'fs';            // using default import
import { mockEnable, mockDisable } from './mock-read-file.js';

mockEnable(Buffer.from('Hello to Jason!'));

readFile('fake-path', (err, data) => {
  if (err) {
    return console.error(`mocked readFile failed with named import: `, err.message);
  }
  console.log(data.toString());
});

fs.readFile('fake-path', (err, data) => {
  if (err) {
    return console.error(`mocked fs.readFile failed when using namespace import: `, err.message);
  }
  console.log(data.toString());
});

fsDefault.readFile('fake-path', (err, data) => {
  if (err) {
    return console.error(`mocked fs.readFile failed when using importing default object: `, err.message);
  }
  console.log(`This one worked: `, data.toString());
});


mockDisable();
readFile('./README.md', (err, data) => {
  if (err) {
    console.error(err);
    process.exit(1);
  }
  console.log(data.toString());
});