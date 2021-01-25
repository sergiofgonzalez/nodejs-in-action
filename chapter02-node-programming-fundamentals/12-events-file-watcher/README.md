# 12-events-file-watcher
> extending EventEmitter to provide custom functionality

## Description
Illustrates how to extend the event emitter's functionality to create a directory watcher that processes the files placed in the watched directory by renaming and moving them to a different directory.

The application uses a custom module `./lib/watcher` that extends `events.EventEmitter` and allows client applications to provide custom logic to handle a custom `"process"` event.

### watcher.js
The Watcher module exports a class `Watcher` with the following API:
+ construction &mdash; use `new Watcher(*directory_to_watch*, *target_directory*)`
+ `start()` &mdash; initiates the watcher on the configured directory. In the implementation, the `fs.watchFile` method is used, which accepts two parameters:
  + the directory to watch
  + a function that will be called each time a changed is detected. In our case, this function consists in calling `watch`.
+ `watch()` &mdash; when called, this method list all the files from the watched directory and emits a `"process"` event for each of them. This method receives no parameters.

**Usage:**
```javascript
const Watcher = require("./lib/watcher");
const watcher = new Watcher(dirToWatch, targetDir);
```
The client application *must* register a listener for the `"process"` event that receives the filename to be processed.
Example:
```javascript
watcher.on("process", filename => console.log(`file to process ${filename}`));
```

### index.js
The index module instantiates the watcher and registers a listener that performs a `fs.rename` from the watched directory to the target directory. It also changes the filename to lowercase.


**Note:**
+ The application requires that the `./rsrc` and `./target` directory exist before running the app. 
+ To verify the functionality, start the application and create a file into `./rsrc`. When the event is received, that file will be moved to the target directory and its name will be chanded to lowercase.