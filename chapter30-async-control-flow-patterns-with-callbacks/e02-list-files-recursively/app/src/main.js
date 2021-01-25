import fs from 'fs';
import path from 'path';

/* list nested Files is the entry point */
function listNestedFiles(dir, cb) {
  const files = [];
  const objects = [];
  scanDir(dir, files, objects, err => {
    if (err) {
      return cb(err);
    }
    cb(null, files, objects);
  });
}

/* scanDir is a supporting function for passing files and objects as context */
function scanDir(dir, files, objects, cb) {
  fs.readdir(dir, (err, dirEntries) => {
    if (err) {
      console.error(`ERROR: listNestedFiles: could not list entries for dir ${ dir }: ${ err.message }`);
      return cb(err);
    }
    return listFiles(dir, dirEntries, files, objects, cb);
  });
}

/* listFiles is the taskOrchestrator for the iteration/recursion */
function listFiles(baseDir, dirEntries, files, objects, cb) {
  function iterate(index) {
    if (index === dirEntries.length) {
      return finish();
    }

    const dirEntryPath = path.join(baseDir, dirEntries[index]);
    inspectDirEntry(dirEntryPath, err => {
      if (err) {
        return cb(err);
      }
      iterate(index + 1);
    });
  }

  /* inspectDirEntry is the task */
  function inspectDirEntry(dirEntryPath, cb) {
    fs.stat(dirEntryPath, (err, stat) => {
      if (err) {
        return cb(err);
      }
      if (stat.isDirectory()) {
        objects.push(dirEntryPath);
        return scanDir(dirEntryPath, files, objects, cb);
      }
      console.log(`file: ${ dirEntryPath }`);
      files.push(dirEntryPath);
      objects.push(dirEntryPath);
      cb();
    });
  }

  function finish() {
    cb();
  }

  iterate(0);
}

listNestedFiles('sample_dir', (err, files, objects) => {
  if (err) {
    console.log(err);
    process.exit(1);
  }
  console.log(`========== done!`);
  console.log(`objects:`, objects);
  console.log(`files:`, files);
});
