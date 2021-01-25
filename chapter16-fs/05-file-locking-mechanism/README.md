# 05-file-locking-mechanism
> several strategies for file locking in Node.js

## Description
The example presents three strategies that can be used to implement basic file locking mechanisms in Node.js.

Obviously, all processes must agree on the same mechanism. Also, the creation of the lockfile needs to be atomic to prevent collisions and race conditions.

The process should be as follows:
+ a process A needs to access a file f for writing
+ A must obtain the lock
+ if A succeeds, then it can modify the file f
+ Once finished, process A must relinquish the lock

### Strategy 1: Acquire an exclusive open lock on a lockfile
```javascript
try {
  await open(path.join(__dirname, "data", "file.txt.lockfile"), "wx");
  // ... if we get here we're good to modify the file ...
  await unlink(path.join(__dirname, "data", "file.txt.lockfile"));
} catch (e) {
  console.log("Error performing operations on file:", e.message);
}
```

### Strategy 2: Write some info to a file using an exclusive lock while writing
```javascript
try {
  await writeFile(path.join(__dirname, "data", "file.txt.lockfile"), 
    { pid: process.pid, accessed: new Date().toISOString() }, { flags: "wx" });
  // ... if we get here we're good to modify the file ...
  await unlink(path.join(__dirname, "data", "file.txt.lockfile"));    
} catch (e) {
  console.log("Error performing operations on file:", e.message);
}
```

### Strategy 3: Use mkdir as the atomic operation for the locking mechanism
```javascript
  try {
    await mkdir(path.join(__dirname, "data", `file.txt.lock/${ process.pid }`));
    // ... if we get here we're good to modify the file ...
    await rmdir(path.join(__dirname, "data", `file.txt.lock/${ process.pid }`));    
  } catch (e) {
    console.log("Error performing operations on file:", e.message);
  }
```