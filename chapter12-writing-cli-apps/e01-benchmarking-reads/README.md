# e01-benchmarking-reads
> a very simple example illustrating how to benchmark how long it takes to read a file

## Description
The example illustrates how to use `console.time` and `console.timeEnd` to benchmark how long it takes to read a file. In the program, a read stream is created with the path received from the command line and the file is read and displayed in stdout.

To test the program do:
```javascript
$ node ./app/src/index.js -r package.json
```

You can pass several arguments as well:
```javascript
$ node ./app/src/index.js -r package.json -r README.md
```