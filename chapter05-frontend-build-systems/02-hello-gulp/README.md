# 02-hello-gulp
> executing a pipeline of tasks with Gulp Task Runner

## Description
Illustrates how to execute a simple pipeline of tasks with *Gulp* consisting in:
+ Getting all the source code from the application's source code folder
+ Prepare the source map files
+ Transpile using Babel for ES2015 and React
+ Concat all of the source code
+ Write to the `build/` directory

The task is built as a Node.js program in the `gulpfile.js` file.

Additionally, a `watch` task has been added to trigger the `default` build pipeline whenever a change in the application files is detected.

**Note**
If *Gulp* is not installed globally, you will have to pick it up from `./node_modules/.bin` as in:
```bash
$ ./node_modules/.bin/gulp
```
