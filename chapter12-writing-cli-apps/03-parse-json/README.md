# 03-parse-json
> implementing a simple, albeit complete, command-line tool using Node.js

## Description
The example illustrates how to implement `parse-json`, a simple tool that parses a JSON file and prints it if valid.

The tool has the following usage syntax:
```
parse-json [options]

Options:
  -h, --help  Show help                                                [boolean]
  -f, --file  JSON file to parse                                      [required]
```

And the `-f` option allows you to pass also data via *stdin* by using:
```bash
$ node app/src/index.js -f -
```

*Note:*
Remember that you can signal the end of *stdin* by pressing *CTRL+D*.

In order to enable passing data via *stdin*, the app uses the `mississippi.concat` method, which allows you to concatenate the stdin info and then call a function on it:
```javascript
process.stdin.pipe(concat(parse));
``` 

### Sharing command-line tools with npm

Apparently, you could include the following to install your application in `./node_modules/.bin`:
```json
{
  "bin": {
    "parse-json": "./app/src/index.js"
  }
}
```

and then using `npm install` but i haven't been able to make it work.

However, it's easy to run a Node.js application as an executable in Linux:
1. Create a regular JavaScript file for the desired functionality
2. Include as the first line the *shebang* for Node.js `#!/usr/bin/env node`.
3. Make sure the file is executable: `chmod +x <file>`
4. Invoke the file: `./<file>`