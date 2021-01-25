import { readFile } from 'fs';

function readJSON(filename, cb) {
  readFile(filename, 'utf8', (err, data) => {
    let parsed;
    if (err) {
      return cb(err);
    }

    /* danger: JSON.parse might fail! */
    parsed = JSON.parse(data);
    cb(null, parsed);
  });
}

try {
  readJSON('README.md', (err, data) => {
    if (err) {
      console.log(`ERROR: could not read: ${ err.message }`);
      process.exit(1);
    }
    console.log(`data: ${ data }`);
  });
} catch (err) {
  console.log(`ERROR: err found while executing readJSON: ${ err.message }`);
}


/* comment to see how the exception jumps up to the event loop */
process.on('uncaughtException', err => {
  console.error(`FATAL: unrecoverable error in the application: ${ err.message }`);
  console.error(`...exiting...`);
  process.exit(1);
});