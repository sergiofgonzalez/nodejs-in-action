# Chapter 14 &mdash; Events
> Events in Node.js: `EventEmitter` and beyond

## [01-hello-custom-event-emitter](./01-hello-custom-event-emitter/)
Illustrates how to create a class that inherits from `EventEmitter` and that sends and listens to events.

## [02-hello-custom-event-emitter](./02-hello-custom-event-emitter/)
Illustrates the significance of the `"error"` event in Node.js event handling.

## [03-hello-new-listener-event](./03-hello-new-listener-event/)
Introduces the `"newListener"` event which is triggered when an event listener is registered on a particular event.

## [04-triggering-events-based-on-new-listeners](./04-triggering-events-based-on-new-listeners/)
A more involved example on `"newListener"` which triggers event when that event is received.

## [05-hello-express-events](./05-hello-express-events/)
Using events in an *Express* application.

## [06-categorizing-event-names](./06-categorizing-event-names/)
Using an object to define the events used in an application, so that property objects are used (rather than strings).
