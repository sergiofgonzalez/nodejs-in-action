import { TaskQueue } from './lib/task-queue.js';
import { promises as fsPromises } from 'fs';
import path from 'path';

function recursiveFind(dir, keyword) {
  const findQueue = new TaskQueue(5);
  const hits = [];
  return scanDir(dir, keyword, hits, findQueue)
    .then(() => hits);
}

function scanDir(dir, keyword, hits, queue) {
  return queue.runTask(() => {
    return fsPromises.readdir(dir)
      .then(dirEntries => {
        const promises = dirEntries.map(dirEntry => findInFileTask(path.join(dir, dirEntry), keyword, hits, queue));
        return Promise.all(promises);
      });
  });
}

function findInFileTask(dirEntryPath, keyword, hits, queue) {
  return fsPromises.stat(dirEntryPath)
    .then(stat => {
      if (stat.isDirectory()) {
        return scanDir(dirEntryPath, keyword, hits, queue);
      }
      return findKeywordInFileContents(dirEntryPath, keyword, hits);
    });
}

function findKeywordInFileContents(file, keyword, hits) {
  return fsPromises.readFile(file, 'utf-8')
    .then(contents => {
      if (contents.match(keyword)) {
        hits.push(file);
      }
      return;
    });
}


recursiveFind('sample_dir', 'foo')
  .then(console.log)
  .catch(console.error);
