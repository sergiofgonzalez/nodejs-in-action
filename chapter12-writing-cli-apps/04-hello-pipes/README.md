# 04-hello-pipes
> piping with Node.js

## Description
Pipes are used to connect the output of a command line application with the input to another.

For example, when you do `history | grep node` you are invoking the history command:
```bash
$ history
...
 2098  chmod +x ./app/src/index.js
 2099  npm install time
 2100  npm install
 2101  npm run setup
 2102  npm install
 2103  cat package.json | ./app/src/index.js
 2104  ls -la
 2105  ls -la | ./app/src/index.js
 2106  history
```

and passing that output to the `grep command` so that only the history entries with `node` on them are printed.

You can use pipes in Node.js using Node's *stream* API and the `.pipe` method:
```javascript
process.stdin.pipe(process.stdout);  // pipe stdin into stdout so that all input is echoed
```

In the example, we use that mechanism to create a simple command that can be used to check how long it takes to execute a command.

For example, you can do:
```bash
$ ls -la | ./app/src/index.js
...
-rw-rw-r--   1 ubuntu ubuntu  1143 Jun  4 19:37 package.json
-rw-rw-r--   1 ubuntu ubuntu 29437 Jun  4 19:37 package-lock.json
-rw-rw-r--   1 ubuntu ubuntu  2237 Jun  4 19:46 README.md
0.004 second(s)
```

or even:
```bash
$ history | grep node | ./app/src/index.js
```

Note that the example works because when you pipe commands, each command starts up immediately. Also, when using pipes, you're receiving a stream of data. That has two consequences:
+ You process the data as you're receiving it from the previous command, instead of receiving all the data once the previous command has completed.
+ You can't know the exit code from the previous command, as it hasn't completed. However, the *shell* defines the operators `&&` and `||`:
```bash
# Execute cmd1, then cmd2 if exit code from cmd1 is zero
$ cmd1 && cmd2

# Execute cmd1, then cmd2 if exit code from cmd1 is non-zero
$ cmd1 || cmd2
```
