/* eslint-disable no-unused-vars */
import lazyStream from 'lazystream';
import fs from 'fs';

const lazyURandom = new lazyStream.Readable(options => {
  return fs.createReadStream('/dev/urandom');
});


// this will write a large amount of random bytes in the stdout
lazyURandom
  .pipe(process.stdout);