/* eslint-disable no-unused-vars */
import { promises as fsPromises } from 'fs';
import path from 'path';
import { TaskQueuePC as TaskQueue } from './lib/task-queue-pc.js';
import pLimit from 'p-limit';


/* Scenario 1: with TaskQueue, boundary applied to the recursive call
  It wont' work if the concurrency limit is less than 3
*/
// async function recursiveFind(dir, keyword) {
//   const taskQueue = new TaskQueue(2);
//   const hits = [];
//   await scanDir(dir, keyword, hits, taskQueue);
//   return hits;
// }

// async function scanDir(dir, keyword, hits, taskQueue) {
//   return taskQueue.runTask(async () => {
//     const dirEntries = await fsPromises.readdir(dir);
//     for (const dirEntry of dirEntries) {
//       const dirEntryPath = path.join(dir, dirEntry);
//       const dirEntryStat = await fsPromises.stat(dirEntryPath);
//       if (dirEntryStat.isDirectory()) {
//         await scanDir(dirEntryPath, keyword, hits, taskQueue);
//       } else {
//         // we assume is file
//         const contents = await fsPromises.readFile(dirEntryPath, 'utf8');
//         if (contents.match(keyword)) {
//           hits.push(dirEntryPath);
//         }
//       }
//     }
//     return hits;
//   });
// }

// recursiveFind('sample_dir/', 'foo')
//   .then(console.log);

/* Scenario 2: Using p-limit, boundary on the initial process, not in recursion
  This means it works even with limit 1, but there'll be more concurrency
  than we probably intend to.
*/

// async function recursiveFind(dir, keyword) {
//   const hits = [];
//   const limit = pLimit(1);
//   await limit(() => scanDir(dir, keyword, hits, limit));
//   return hits;
// }

// async function scanDir(dir, keyword, hits, limit) {
//   const dirEntries = await fsPromises.readdir(dir);
//   for (const dirEntry of dirEntries) {
//     const dirEntryPath = path.join(dir, dirEntry);
//     const dirEntryStat = await fsPromises.stat(dirEntryPath);
//     if (dirEntryStat.isDirectory()) {
//       await scanDir(dirEntryPath, keyword, hits, limit);
//     } else {
//       // we assume is file
//       const contents = await fsPromises.readFile(dirEntryPath, 'utf8');
//       if (contents.match(keyword)) {
//         hits.push(dirEntryPath);
//       }
//     }
//   }
// }

// recursiveFind('sample_dir/', 'foo')
//   .then(console.log);

/* Scenario 3: trying to apply other boundaries, with p-limit
  This one only works if limit is set to 7 or more
*/
async function processDir(dir, keyword) {
  const limit = pLimit(6);
  const hits = [];
  await findInFiles(dir, keyword, hits, limit);
  return hits;
}

async function findInFiles(dir, keyword, hits, limit) {
  const dirEntries = await fsPromises.readdir(dir);
  const promises = dirEntries.map(dirEntry => limit(() => findKeywordInFile(path.join(dir, dirEntry), keyword, hits, limit)));
  await Promise.all(promises);
  console.log(`promises for findInFiles(${ dir}, ... ): settled!`);
  return;
}

async function findKeywordInFile(file, keyword, hits, limit) {
  const stat = await fsPromises.stat(file);
  if (stat.isDirectory()) {
    console.log(`${ file } is dir: initiating recursive call`);
    await findInFiles(file, keyword, hits, limit);
    return;
  }
  const contents = await fsPromises.readFile(file, 'utf8');
  if (contents.match(keyword)) {
    console.log(`found in ${ file }: pushing!`);
    hits.push(file);
  } else {
    console.log(`not found in ${ file }: returning nothing`);
    return;
  }
}

processDir('sample_dir', 'foo')
  .then(console.log);



// async function recursiveFind(dir, keyword) {
//   const hits = [];
//   const taskQueue = new TaskQueue(2);
//   await taskQueue.runTask(() => scanDir(dir, keyword, hits, taskQueue));
//   return hits;
// }

// async function scanDir(dir, keyword, hits, taskQueue) {
//   const dirEntries = await fsPromises.readdir(dir);
//   const promises = dirEntries.map(async dirEntry => {
//     const dirEntryPath = path.join(dir, dirEntry);
//     const dirEntryStat = await fsPromises.stat(dirEntryPath);
//     if (dirEntryStat.isDirectory()) {
//       await scanDir(dirEntryPath, keyword, hits, taskQueue);
//     } else {
//       // we assume is file
//       const contents = await fsPromises.readFile(dirEntryPath, 'utf8');
//       if (contents.match(keyword)) {
//         hits.push(dirEntryPath);
//       }
//     }
//   });
//   await Promise.all(promises);
// }

// recursiveFind('sample_dir', 'foo')
//   .then((results) => console.log(results))
//   .catch(err => console.error(err.message));
