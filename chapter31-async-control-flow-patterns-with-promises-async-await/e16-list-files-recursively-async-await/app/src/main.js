import { promises as fsPromises } from 'fs';
import path from 'path';


async function listNestedFiles(dir) {
  const files = [];
  const objects = [];
  await scanDir(dir, files, objects);
  console.log(`INFO: completed scanning of ${ dir } subtree`);
  return { files, objects };
}

async function scanDir(dir, files, objects) {
  const dirEntries = await fsPromises.readdir(dir);
  for (const dirEntry of dirEntries) {
    const dirEntryPath = path.join(dir, dirEntry);
    const stat = await fsPromises.stat(dirEntryPath);
    objects.push(dirEntryPath);
    if (stat.isDirectory()) {
      await scanDir(dirEntryPath, files, objects);
    } else {
      files.push(dirEntryPath);
    }
  }
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