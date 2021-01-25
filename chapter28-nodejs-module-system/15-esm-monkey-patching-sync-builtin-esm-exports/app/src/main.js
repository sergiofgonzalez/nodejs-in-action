import fs, { readFileSync } from 'fs';
import { syncBuiltinESMExports } from 'module';

fs.readFileSync = () => Buffer.from('Hello to Jason!');
syncBuiltinESMExports();

console.log(fs.readFileSync === readFileSync);

const data = fs.readFileSync('fake-path');
console.log(`data: `, data.toString());