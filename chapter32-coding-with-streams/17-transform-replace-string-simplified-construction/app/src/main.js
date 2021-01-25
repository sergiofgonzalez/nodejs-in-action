import { Transform } from 'stream';

let tail = '';
const searchStr = 'Jason Isaacs';
const replaceStr = 'Idris Elba';

const replaceStream = new Transform({
  defaultEncoding: 'utf8',

  transform(chunk, encoding, cb) {
    const pieces = (tail + chunk).split(searchStr);
    const lastPiece = pieces[pieces.length - 1];
    const tailLen = searchStr.length - 1;
    tail = lastPiece.slice(-tailLen);
    pieces[pieces.length - 1] = lastPiece.slice(0, -tailLen);
    this.push(pieces.join(replaceStr));
    cb();
  },

  flush(cb) {
    this.push(tail);
    cb();
  }
});

replaceStream.on('data', chunk => console.log(chunk.toString()));

replaceStream.write('Hello to Jason ');
replaceStream.write('Isaacs!!!');
replaceStream.end();