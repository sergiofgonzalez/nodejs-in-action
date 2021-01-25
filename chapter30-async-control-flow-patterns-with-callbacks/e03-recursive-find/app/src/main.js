import { TaskQueue } from './lib/task-queue.js';
import fs from 'fs';
import path from 'path';

function recursiveFind(dir, keyword, cb) {
  const findQueue = new TaskQueue(5);
  const hits = [];
  const errors = [];

  findQueue
    .on('error', err => {
      console.log(`ERROR: recursiveFind: failed for ${ dir } searching for ${ keyword }: ${ err.message }`);
      errors.push(err);
    })
    .on('empty', () => cb(errors.length > 0 ? errors : null, hits));

  scandir(dir, keyword, hits, errors, findQueue);
}

function scandir(dir, keyword, hits, errors, queue) {
  fs.readdir(dir, (err, dirEntries) => {
    if (err) {
      return errors.push(err);
    }

    dirEntries.forEach(dirEntry => {
      queue.pushTask(taskDone => findInFileTask(path.join(dir, dirEntry), keyword, hits, errors, queue, taskDone));
    });
  });
}

function findInFileTask(dirEntryPath, keyword, hits, errors, queue, cb) {
  fs.stat(dirEntryPath, (err, stat) => {
    if (err) {
      errors.push(err);
      return cb(err);
    }
    if (stat.isDirectory()) {
      scandir(dirEntryPath, keyword, hits, errors, queue);
      cb();
    } else {
      findKeywordInFileContents(dirEntryPath, keyword, hits, errors, cb);
    }
  });
}

function findKeywordInFileContents(file, keyword, hits, errors, cb) {
  fs.readFile(file, 'utf8', (err, contents) => {
    if (err) {
      errors.push(err);
      return cb(err);
    }
    if (contents.match(keyword)) {
      hits.push(file);
      return cb(null, file);
    } else {
      return cb();
    }
  });
}



recursiveFind('sample_dir', 'foo', (errors, hits) => {
  if (errors) {
    console.log(`Errors were found while doing recursiveFind: `, errors);
    process.exit(1);
  }
  console.log(`hits(foor): `, hits);
});

recursiveFind('sample_dir', 'bar', (errors, hits) => {
  if (errors) {
    console.log(`Errors were found while doing recursiveFind: `, errors);
    process.exit(1);
  }
  console.log(`hits(bar): `, hits);
});

recursiveFind('sample_dir', 'roo', (errors, hits) => {
  if (errors) {
    console.log(`Errors were found while doing recursiveFind: `, errors);
    process.exit(1);
  }
  console.log(`hits(roo): `, hits);
});