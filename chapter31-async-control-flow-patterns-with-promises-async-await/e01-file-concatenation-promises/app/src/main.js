import { promises as fsPromises } from 'fs';

function concatFiles(...args) {
  const { inputFiles, destFile } = getParamsFromArgs(args);
  let accContents = '';
  let promise = Promise.resolve();
  for (const inputFile of inputFiles) {
    promise = promise
      .then(() => fsPromises.readFile(inputFile, 'utf-8'))
      .then(fileContents => accContents += fileContents);
  }
  promise
    .then(() => fsPromises.writeFile(destFile, accContents, 'utf-8'));

  return promise;
}

function getParamsFromArgs(args) {
  const argsCopy = [...args];
  const destFile = argsCopy.pop();
  const inputFiles = argsCopy;
  return { inputFiles, destFile };
}

concatFiles('sample_files/foo.txt', 'sample_files/bar.txt', 'sample_files/foobar.txt', 'sample_files/out.txt')
  .then(() => console.log(`INFO: files succesfully concatenated`))
  .catch(err => {
    console.error(`ERROR: could not concatenate files: ${ err.message }`);
    process.exit(1);
  });
