import { promises as fsPromises } from 'fs';

async function concatFiles(...args) {
  const { inputFiles, destFile } = getParamsFromArgs(args);
  let accContents = '';
  for (const inputFile of inputFiles) {
    const fileContents = await fsPromises.readFile(inputFile, 'utf-8');
    accContents += fileContents;
  }
  await fsPromises.writeFile(destFile, accContents, 'utf-8');
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
