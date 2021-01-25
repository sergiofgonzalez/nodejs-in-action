# 05-client-server-udp
> an UDP based chat program

## Description
The example illustrates how to build a simple UDP chat program. Both the server and the client are implemented in the same program.

As the UDP protocol is connectionless, the server keeps track of the connected clients, and whenever a message is received, it relays the message to the other connected clients.

**Note**
In order to differentiate when we are called as a module or from the command line, the program uses:
```javascript
if (module.parent) {
  // we've been required
} else {
  // we've been called from the command-line
}
```
The `module.parent` property is initialized to the module that first required this one.

### Enter `readline` module
The `readline` core module provides an interface for reading data from a Readable stream (such as stdin) one line at a time. This module has been used on the client side to capture user-input in a friendly manner:

+ `readline.createInterface` &mdash; creates a new `readline.Interface` instance, from which you can start reading user input.
+ `setPrompt` &mdash; sets the prompt that will be written to the output when `prompt()` is called.
+ `prompt` &mdash; write a new line in output with the configured prompt so that the user can provide new input.
+ `"line"` &mdash; event emitted whenever the input stream received and end-of-line input.
+ `"close"` &mdash; event emitted when the `readline.Interface` is considered finished either because `close()` has been called, or because a termination signal (such as *CTRL+c*) has been received.

