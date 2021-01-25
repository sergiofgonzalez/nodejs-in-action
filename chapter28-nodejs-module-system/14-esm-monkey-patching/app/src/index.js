import fs from 'fs';
import { mockEnable, mockDisable } from './mock-read-file.js';

mockEnable(Buffer.from('Hello to Jason!'));

fs.readFile('fake-path', (err, data) => {
  if (err) {
    console.error(err);
    process.exit(1);
  }
  console.log(data.toString());
});

mockDisable();
fs.readFile('./README.md', (err, data) => {
  if (err) {
    console.error(err);
    process.exit(1);
  }
  console.log(data.toString());
});