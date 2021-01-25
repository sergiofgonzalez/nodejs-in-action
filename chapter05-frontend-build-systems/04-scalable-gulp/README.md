# 04-scalable-gulp
> breaking down Gulp tasks in individual file

## Description
This project illustrates a pattern that can be used to break down the tasks in your `gulpfile.js` in individual files, so that it's easier to manage and control.

The structure is as follows:
```
|- src/                 <= app sources
|- gulp/                <= gulp related tasks and sources
|--- tasks/             <= task directory
|----- action1-task.js  <= task files invoking gulp.task
|----- action2-task.js
....
|----- actionN-task.js
|--- index.js           <= simple file requiring all files from tasks/
|- gulpfile             <= requires `./gulp/index.js`
``` 

**Notes**
+ If *Gulp* is not installed globally, you will have to pick it up from `./node_modules/.bin` as in:
```bash
$ ./node_modules/.bin/gulp
```
