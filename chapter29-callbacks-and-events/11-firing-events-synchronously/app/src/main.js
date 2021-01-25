import { EventEmitter } from 'events';
import { readFileSync } from 'fs';



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
    for (const file of this.files) {
      let content;
      try {
        content = readFileSync(file, 'utf8');
      } catch (err) {
        console.error(`ERROR: FindRegex: couldn't read file: ${ err.message }`);
        return this.emit(err);
      }
      
      this.emit('fileread', file);

      const match = content.match(this.regex);
      if (match) {
        match.forEach(hit => this.emit('found', file, hit));
      }
    }
    return this;
  }
}


/* 
  as find() is sync and the listeners are registered
  after `find()` is called, they will NOT be invoked
*/
const findRegexInstance = new FindRegex(/babel.+/g);
findRegexInstance
  .addFile('./package.json')
  .addFile('./package-lock.json')
  .find()
  .on('fileread', file => console.log(`About to scan ${ file }`))
  .on('found', (file, match) => console.log(`HIT: ${ file } : ${ match }`))
  .on('error', err => console.error(`ERROR: error found while scanning: ${ err.message }`));

/*
  however, if we define the listeners before, it will work
  as expected
*/
findRegexInstance
  .addFile('./package.json')
  .addFile('./package-lock.json')
  .on('fileread', file => console.log(`About to scan ${ file }`))
  .on('found', (file, match) => console.log(`HIT: ${ file } : ${ match }`))
  .on('error', err => console.error(`ERROR: error found while scanning: ${ err.message }`))  
  .find();