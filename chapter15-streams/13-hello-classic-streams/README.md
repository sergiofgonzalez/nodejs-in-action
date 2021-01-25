# 13-hello-classic-streams
> introducing Node's old interface for streams

## Description
Classic readable streams are just event emitters that emit `"data"` events when they have data for their consumers and emit `"end"` events when they're done producing data for their consumers.

**Note:**
Whenever a stream has a `"data"` listener registered, it switches into *classic mode*. Therefore, you should pretty much never register `"data"` and `"end"` handlers and instead use the API for stream consumers and producers.