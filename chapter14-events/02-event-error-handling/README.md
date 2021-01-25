# 02-event-error-handling
> the significance of `error` events in Node.js

## Description
In this example, we illustrate how `"error"` events have a special significance in Node.js:

*When an EventEmitter instance experiences an error, the typical action is to emit an error event. Error events are treated as a special case in Node. If there is no listener for it, then the default action is to print the stack trace and exit the program.*

In the program, we register a *once* listener for the error event and trigger two `"error"` events. The first one is handled and therefore the program does not exist, but the second one is not handled and therefore the stack trace is printed and the program exits.