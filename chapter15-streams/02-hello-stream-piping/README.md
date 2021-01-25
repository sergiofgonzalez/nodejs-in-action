# 02-hello-stream-piping
> introducing piping between streams

## Description
This example illustrates how to pipe streams. Based on [01-hello-built-in-streams](../01-hello-built-in-streams), we enable a mode that creates a *ReadableStream* that is piped to `zlib.createGzip()` method which transforms into a gzipped stream, and then it is piped into the HTTP `response` object. 

In order to test it, run:
```bash
LARGE_FILE_PATH="<path-to-really-large-file>" npm start
```
