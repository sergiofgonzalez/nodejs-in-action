# 05-hello-express-events
> how to send and listen to events when using the *Express* framework

## Description
The object returned by the `express()` function mixes an `EventEmitter`. The example illustrates how to use events in the context of an Express application.

In the example, we define a listener for a custom event and then emit this event whenever a particular endpoint has been hit.
