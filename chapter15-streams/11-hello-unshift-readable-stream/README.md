# 10-consuming-readable-stream
> returning content to a `stream.Readable` using `unshift`

## Description
This example illustrates how you can return some data to the stream when either you have optmistically consumed more than necessary.

Note that in the example, we also use unshift when we don't have enough data to process (i.e. you need a full line). This use-case could've been solved more efficiently by maintaining a local copy of the already read data, but I used unshift for demonstration purposes.

Some considerations:
+ `readable` is emitted when there is data available to be read from the stream, and also once the end of the stream daa has been reached, but before the `end` event is emitted.
This means that you don't get `readable` each time a chunk is available. Therefore, it makes sense to remove the listener on the `readable` event if you're invoking `stream.read()` yourself.

