import { EventEmitter } from 'events';
import { readFile } from 'fs';


class FindRegex extends EventEmitter {
  constructor(regex) {
    super();
    this.regex = regex;
    this.files = [];
  }

  addFile(file) {
    this.files.push(file);
    return this;
  }

  find() {
    process.nextTick(() => this.emit('started', this.files));
    for (const file of this.files) {
      readFile(file, 'utf8', (err, content) => {
        if (err) {
          console.error(`ERROR: FindRegex: couldn't read file: ${ err.message }`);
          return this.emit(err);
        }

        this.emit('fileread', file);

        const match = content.match(this.regex);
        if (match) {
          match.forEach(hit => this.emit('found', file, hit));
        }
      });
    }
    return this;
  }
}

const findRegexInstance = new FindRegex(/babel.+/g);
findRegexInstance
  .addFile('./package.json')
  .addFile('./package-lock.json')
  .find()
  .on('started', (files) => console.log(`Scanning started for ${ files }`))
  .on('fileread', file => console.log(`About to scan ${ file }`))
  .on('found', (file, match) => console.log(`HIT: ${ file } : ${ match }`))
  .on('error', err => console.error(`ERROR: error found while scanning: ${ err.message }`));
