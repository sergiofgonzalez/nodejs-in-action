# Chapter 2 &mdash; Node Programming Fundamentals
> Node Fundamentals: modules, callbacks, events and async flow management

## 01-hello-node-modules
Illustrates how to create modules in Node.js and how to expose functions to consumers using `exports`. The example creates a module that converts from Euros to Rupees and vice versa and exposes both functions using `exports.fnName = function()`. The application demonstrate how to require and use that module.

## 02-hello-module-exports
Illustrates how to use `module.exports` to export a single object. In the example, a class is created inside a module and the constructor is exported using `module.exports`. The application using the module demonstrates how to grab a reference to the constructor using require, how to create different instances of the class exported by the module and how to use the exported functions.

## 03-hello-module-directory
Illustrates how to create modules in directories. In the example, a module is created in the directory, and the directory code is written in a file different from the default one (`index.js`).

## 04-module-caching
A very simple example of Node.js module caching. The application includes a main program which requires some modules, which in turn require a common shared module. The example illustrates that the internal state of the shared module is the same for all the modules because of Node.js caching for modules.

## 05-hello-callbacks
Illustrate the use of callbacks to handle one-off events. In the example, a very simple HTTP server that asynchronously reads some data from a JSON file and some HTML template is implemented. All async operations are handled with callbacks.

## 06-hello-callbacks-refactored
Illustrate the use of callbacks to handle one-off events. In the example, a very simple HTTP server that asynchronously reads some data from a JSON file and some HTML template is implemented. All async operations are handled with callbacks.

## 07-hello-events-echo-server
Implements a very simple TCP server that returns whatever it receives as an example of how to handle events.

## 08-hello-events-only-once
Illustrates how to handle a one-time event in Node.js.

## 09-hello-event-emitter
Illustrates the basics of `EventEmitter`: registering listeners and emitting events.

## 10-events-chat-server-v0
Illustrates the use of *events* in a complete application that implements a TCP chat server that allows client to communicate using *telnet*.

## 11-events-chat-server-v1
Illustrates the use of *events* in a complete application that implements a TCP chat server that allows client to communicate using *telnet*.

## 12-events-file-watcher
Illustrates how to extend the standard `events.EventEmitter` to provide custom functionality. In the example, a watcher is established in a configured directory and the client code can provide a listener for a custom event and do some custom processing.

## 13-async-caveat
Demonstrates why mixing async and sync code may lead to unexpected results in a very simple example that displays some app internal state.

## 14-closures
Illustrates how a closure can be used to bind state into an async function call. The fat arrow syntax is used for the closure definition.

## 15-serial-flow-custom
Illustrates how to implement a simple custom serial flow control in a rather intricate application. The application selects a random RSS feed from a local file system and then downloads, parses and prints some of the information from the RSS.

## 16-parallel-flow-custom
Illustrates how to implement parallel flow control for tasks that are discovered dynamically in a somewhat intricate example. The application performs a wordcount asynchronously and dynamically for all the files in a configured directory.

## e01-async-waterfall-rss-feed
An example consisting in rewriting the *serial-flow-custom* example, but using the *async* module instead of doing it custom.

## [e02-modules-for-exchanging-data](e02-modules-for-exchanging-data/)
An example illustrating how to use a module for exchanging data between different parts of an application.

## [e03-symmetric-crypto](e03-symmetric-crypto/)
An example illustrating how to create a basic crypto helper that encrypts and decrypts using a hardcoded key.

## [e03-symmetric-crypto](e03-symmetric-crypto/)
An example illustrating how to create a basic crypto helper that encrypts and decrypts using a hardcoded key.

## [e04-exports-and-exports-module](e04-exports-and-exports-module/)
A very simple example illustrating when to use `exports.method = ...` vs. `module.exports = ...`.

## [e05-hello-util-promisify](e05-hello-util-promisify/)
An introduction about how to use `util.promisify` to convert callback-based functions to Promises.

## [e06-hello-require-module-groups](e06-hello-require-module-groups/)
An example illustrating how to group related modules and load them in a single `require`. 

## [e07-hello-require-module-groups-package](e07-hello-require-module-groups-package/)
An example illustrating how to group related modules and load them in a single `require` in a very flexible using using a `package.json`.

## [e08-hello-file-locations](e08-hello-file-locations/)
An example illustrating `__dirname`, `__filename` and `path.join`.

## [e09-hello-pipes](e09-hello-pipes/)
An example illustrating `__dirname`, `__filename` and `path.join`.

## [e10-hello-console-methods](e10-hello-console-methods/)
Illustrates the different features of the `console` object.

## [e11-hello-os-integration](e11-hello-os-integration/)
Illustrates the different features available to integrate with the underlying OS such as getting memory usage, the process ID, reading arguments from the command line, exiting with a particular exit code or listening on OS signals.

## [e12-hello-unref](e12-hello-unref/)
Illustrates the usage of `unref` which tells Node.js that an established timer should not prevent the program from exiting.

## [e13-hello-process-next-tick](e13-hello-process-next-tick/)
Illustrates how to use `process.nextTick` to send an otherwise synchronous operation to the callback queue.

## [e14-hello-set-immediate](e14-hello-set-immediate/)
Illustrates how to use `process.setImmediate` to send an otherwise synchronous operation to the callback queue.

## [e15-hello-promisify](e15-hello-promisify/)
Illustrates what `util.promisify` is and how to use it to convert regular callbacks in *promises*.

## [e16-hello-jwt](e16-hello-jwt/)
Grokking *JWT (Jason Web Tokens)* using both 3rd party modules and Node.js.

## [e17-custom-promisified-read](e17-custom-promisified-read/)
Simple library exposing a *promisified* version of read that returns its materialized contents (therefore not approapriate for large files).

## [e18-custom-promisified-http-request](e18-custom-promisified-http-request)
Simple http promised based library (wip).

## [e19-hello-import-json-file](e19-hello-import-json-file)
Simple program demonstrating how to import a JSON file.

## [e20-hello-papaparse](e20-hello-papaparse)
Illustrates `papaparse` CSV parsing capabilities

## [e21-node-events](e21-node-events)
A refresher on Node.js `EventEmitter` class and its methods.
