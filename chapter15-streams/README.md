# Chapter 15 &mdash; Streams
> understanding *Streams*

## [01-hello-built-in-streams](./01-hello-built-in-streams/)
Introduces streams with an example that presents an streaming and non-streaming solution to send a large file to a client.

## [02-hello-stream-piping](./02-hello-stream-piping/)
Introduces streams piping by creating a readable stream and piping it to a gzipped stream and then piped into the HTTP response.

## [03-hello-stream-error-handling](./03-hello-stream-error-handling/)
Introduces the technique for handling error while working with streams.

## [04-implementing-readable-stream](./04-implementing-readable-stream/)
Illustrates how to implement a readable stream.

## [05-object-based-readable-stream](./05-object-based-readable-stream/)
Illustrates how to implement a readable stream that receives objects instead of strings or bytes.

## [06-implementing-writable-stream](./06-implementing-writable-stream/)
Illustrates how to implement a writable stream.

## [07-hello-duplex-streams](./07-hello-duplex-streams/)
Introduces the duplex streams that can act as readable and writable streams through a simple example.

## [08-hello-transform-streams](./08-hello-transform-streams/)
Introduces the transform streams that can also act as readable and writable streams.

## [09-hello-readable-stream](./09-hello-readable-stream/)
Introduces the `stream.Readable` at its simplest.

## [10-consuming-readable-stream](./10-consuming-readable-stream/)
Illustrates how to consume from a readable stream.

## [11-hello-unshift-readable-stream](./11-hello-unshift-readable-stream/)
Illustrates how to return data to the stream that you have consumed optimistically using `unshift`.

## [12-hello-writable-stream](./12-hello-writable-stream/)
Introduces the `stream.Writable` at its simplest.

## [13-hello-classic-streams](./13-hello-classic-streams/)
Introduces the Node's old interface for streams.

## [14-optimizing-streams-buffer](./14-optimizing-streams-buffer/)
Illustrates how to tailor a stream's internal buffer and how to benchmark time and memory.

## [15-adapting-streams-on-destination](./15-adapting-streams-on-destination/)
Illustrates how to adapt the behavior of a readable stream based on the destination it has been piped into.

## [e01-pushing-chunks-on-demand](./e01-pushing-chunks-on-demand/)
Illustrates how to provide chunks to a consumer stream on demand, rather than buffering it without knowing if the consumer stream is ready to consume it.