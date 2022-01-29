import * as readline from 'node:readline';
import { createReadStream, createWriteStream } from 'node:fs';
import path from 'path';


const inputStream = createReadStream(path.join(__dirname, '..', 'pandora-from-pdf.txt'));
const outputStream = createWriteStream(path.join(__dirname, '..', 'pandora.txt'));

const rl = readline.createInterface({
  input: inputStream
});

let numLines = 0;
let gameNumId: number;

rl.on('line', (input) => {
  if (++numLines % 2 !== 0) {
    gameNumId = Number.parseInt(input);
  } else {
    outputStream.write(`${ gameNumId } ${ input.trim() }\n`);
  }
});
rl.on('close', () => console.log(`done!`));
rl.on('err', (err) => console.error(`ERROR: could not finish processing: ${ (err as Error).message }`));
