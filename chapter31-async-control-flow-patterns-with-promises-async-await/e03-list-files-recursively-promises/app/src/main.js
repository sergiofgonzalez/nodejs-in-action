import { promises as fsPromises } from 'fs';
import path from 'path';


function listNestedFiles(dir) {
  const files = [];
  const objects = [];
  return scanDir(dir, files, objects)
    .then(() => {
      console.log(`INFO: completed scanning of ${ dir } subtree`);
      return { files, objects };
    });
}

function scanDir(dir, files, objects) {
  return fsPromises.readdir(dir)
    .then(dirEntries => processDirEntries(dir, dirEntries, files, objects));
}

function processDirEntries(dir, dirEntries, files, objects) {
  let promise = Promise.resolve();
  for (const dirEntry of dirEntries) {
    const dirEntryPath = path.join(dir, dirEntry);
    promise = promise
      .then(() => fsPromises.stat(dirEntryPath))
      .then(stat => {
        objects.push(dirEntryPath);
        if (stat.isDirectory()) {
          return scanDir(dirEntryPath, files, objects);
        }
        files.push(dirEntryPath);
      });
  }
  // next line is not necessary but helps to visualize everything is going fine
  promise.then(() => console.log(`INFO: scanning of ${ dir }/ completed`));
  return promise;
}

listNestedFiles('sample_dir/')
  .then(({ files, objects }) => {
    console.log(`========== done!`);
    console.log(`objects:`, objects);
    console.log(`files:`, files);
  })
  .catch(err => {
    console.error(`ERROR: could not complete directory scanning: ${ err.message }`);
  });