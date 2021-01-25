import { ReplaceStream } from './lib/replace-stream.js';

const replaceStream = new ReplaceStream('Jason Isaacs', 'Idris Elba');

replaceStream.on('data', chunk => console.log(chunk.toString()));

replaceStream.write('Hello to Jason ');
replaceStream.write('Isaacs!!!');
replaceStream.end();