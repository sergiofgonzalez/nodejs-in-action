import { TaskQueuePC as TaskQueue } from './lib/task-queue-pc.js';
import { promises as fsPromises } from 'fs';
import path from 'path';

async function recursiveFind(dir, keyword) {
  const findQueue = new TaskQueue(5);
  const hits = [];
  await scanDir(dir, keyword, hits, findQueue);
  return hits;
}

function scanDir(dir, keyword, hits, queue) {
  return queue.runTask(async () => {
    const dirEntries = await fsPromises.readdir(dir);
    const promises = dirEntries.map(dirEntry => findInFileTask(path.join(dir, dirEntry), keyword, hits, queue));
    await Promise.all(promises);
    return;
  });
}

async function findInFileTask(dirEntryPath, keyword, hits, queue) {
  const stat = await fsPromises.stat(dirEntryPath);
  if (stat.isDirectory()) {
    return scanDir(dirEntryPath, keyword, hits, queue);
  } else {
    return findKeywordInFileContents(dirEntryPath, keyword, hits);
  }
}

async function findKeywordInFileContents(file, keyword, hits) {
  const contents = await fsPromises.readFile(file, 'utf-8');
  if (contents.match(keyword)) {
    hits.push(file);
  }
  return;
}


recursiveFind('sample_dir', 'foo')
  .then(console.log)
  .catch(console.error);
