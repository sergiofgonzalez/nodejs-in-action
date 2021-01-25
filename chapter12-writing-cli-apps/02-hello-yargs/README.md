# 02-hello-yargs
> using `yargs` for command-line applications

## Description
The example illustrates how to use `yargs` to facilitate parsing and enforcing command-line parameters for your application.


The `yargs` module parses the command-line arguments and creates a JavaScript object to facilitate accessing what the user has passed in the command-line.

For example, when typing `node app/src/index.js -f some-file.txt --enable-flag` you'd get
```javascript
{ 
  _: [],
  f: "some-file.txt",
  "enable-flag": true,
  enableFlag: true,
  "$0": '/usr/bin/nodejs app/src/index.js' 
}
```

`yargs` also features some convenience methods to specify the required arguments:
```javascript
const argv = yargs
  .demand("f")    // require -f
  .nargs("f", 1)  // -f needs one arg after it
  .describe("f", "JSON file to parse") // message to display if incorrect args
  .argv;
```
