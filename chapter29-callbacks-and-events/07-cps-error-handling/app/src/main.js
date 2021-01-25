import { readFile } from 'fs';

function readJSON(filename, cb) {
  readFile(filename, 'utf8', (err, data) => {
    let parsed;
    if (err) {
      return cb(err);
    }

    try {
      parsed = JSON.parse(data);
    } catch (err) {
      return cb(err);
    }

    cb(null, parsed);
  });
}

readJSON('package.json', (err, data) => {
  if (err) {
    console.log(`ERROR: ${ err.message }`);
    process.exit(1);
  }
  console.log(`${ Object.keys(data.scripts).length } scripts found in the file`);
});


/* there's an error in the JSON */
readJSON('README.MD', (err, data) => {
  if (err) {
    console.log(`ERROR: ${ err.message }`);
    return;
  }
  console.log(`data: ${ data }`);
});

/* there's an error in the callback */
readJSON('package.json', (err, data) => {
  if (err) {
    console.log(`ERROR: ${ err.message }`);
    process.exit(1);
  }
  const numScripts = Object.keys(data?.scripts).length;
  if (numScripts !== 0) {
    throw new Error('Unexpected number of scripts: expected 0');
  }
});