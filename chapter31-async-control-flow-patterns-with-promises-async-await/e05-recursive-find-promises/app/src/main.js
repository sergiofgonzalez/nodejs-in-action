import { TaskQueue } from './lib/task-queue.js';
import { promises as fsPromises } from 'fs';
import path from 'path';

function recursiveFind(dir, keyword) {
  const findQueue = new TaskQueue(5);
  const hits = [];
  scanDir(dir, keyword, hits, findQueue);
  return new Promise(resolve => {
    findQueue.on('empty', () => resolve(hits));
  });
}

function scanDir(dir, keyword, hits, queue) {
  return fsPromises.readdir(dir)
    .then(dirEntries => {
      dirEntries.forEach(dirEntry => {
        queue.runTask(() => findInFileTask(path.join(dir, dirEntry), keyword, hits, queue));
      });
    });
}

function findInFileTask(dirEntryPath, keyword, hits, queue, promises) {
  return fsPromises.stat(dirEntryPath)
    .then(stat => {
      if (stat.isDirectory()) {
        return scanDir(dirEntryPath, keyword, hits, queue, promises);
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


recursiveFind('sample_dir', 'bar')
  .then(console.log)
  .catch(console.error);
