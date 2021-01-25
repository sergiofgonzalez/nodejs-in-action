# e01-wordcount-cli
> enhancing the streaming wordcount example as a command line application

## Description
An example that enhances the streaming word count example with the following capabilities:
+ Allow receiving arguments to lead the execution
+ Uses `yargs` for command parsing, validation, etc.
+ Supports both http/https and piping standard input
+ The text to match can also be sent as a parameter


Note that `npm start` does not work well with this application, as it is removing the required `-t` parameter. It's recommended to use directly `node` instead:

```bash
# look for matches of the word deal, ignoring case in the given URL
$ node app/src/index.js https://www.manning.com --text deal

# look for matches of the word Node, ignoring case, in the contents of package.json
$ cat package.json | node app/src/index.js . -t Node
```

## Tests
The project includes some basic tests using several different frameworks:
+ Native Node.js testing using `assert` &mdash; the test looks like a regular Node.js program in which assertions are inserted.
+ Testing using the `tap` module &mdash; a Node.js framework that is picking some traction thanks to the reduced set of dependencies, support for coverage, etc.