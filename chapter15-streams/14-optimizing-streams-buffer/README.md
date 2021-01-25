# 14-optimizing-streams-buffer
> tailoring stream's buffer size and benchmarking time and memory

## Description
A contrived example that illustrates how to tailor the size of the internal buffer of a stream using:
```javascript
const input = fs.createReadStream("...", { bufferSize: <size> });
```

The example runs a scenario consisting in reading with different buffer sizes words, compressing them using `zlib` module and taking times and memory.