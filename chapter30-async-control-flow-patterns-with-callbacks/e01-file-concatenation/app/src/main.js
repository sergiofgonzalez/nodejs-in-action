import { readFile, writeFile } from 'fs';


export function concatFiles(...args) {
  const { cb, dest, inputFiles } = getParamsFromArgs(args);
  let contents = '';

  function iterate(index) {
    if (index === inputFiles.length) {
      return finish(contents, cb);
    }

    readFileContentsTask(inputFiles[index], (err, data) => {
      if (err) {
        console.log(`ERROR: concatFiles-iterate: could not concat: ${ err.message }`);
        return cb(err);
      }
      contents += data;
      iterate(index + 1);
    });
  }

  function finish(contents, cb) {
    writeFile(dest, contents, err => {
      if (err) {
        console.log(`ERROR: concatFiles-finish: could not write destination file: ${ err.message }`);
        return cb(err);
      }
      cb();
    });
  }

  iterate(0);
}

function readFileContentsTask(filename, cb) {
  readFile(filename, 'utf8', (err, data) => {
    if (err) {
      console.error(`ERROR: concatFileTask: could not read file ${ filename }: ${ err.message }`);
      return cb(err);
    }
    cb(null, data);
  });
}


function getParamsFromArgs(args) {
  const argsCopy = [...args];

  const cb = argsCopy.pop();
  const dest = argsCopy.pop();
  const inputFiles = argsCopy;

  return { cb, dest, inputFiles };
}

concatFiles('sample_files/foo.txt', 'sample_files/bar.txt', 'sample_files/foobar.txt', 'sample_files/out.txt', err => {
  if (err) {
    console.error(`ERROR: concatFiles: could not concatenate files ${ err.message }`);
    return;
  }
  console.log(`INFO: concatFiles: successfully concatenated files!`);
});