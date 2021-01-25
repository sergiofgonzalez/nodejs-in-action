# 03-gulp-tasks
> using Gulp Task runner to replicate the basic set of NPM tasks

## Description
Illustrates how to develop a similar set of tasks to the ones used for basic frontend dev:
+ `clean` &mdash; deletes the `build/` directory using `gulp-clean` package (Note: `del` could have been used instead).
+ `lint` &mdash; runs the *eslint* linter on both the *Node.js* and *frontend* JavaScript sources.
+ `build` &mdash; runs `lint` task and then copies the contents of `src/` into `build/`. 
+ `serve` &mdash; runs `build` task and then uses `spawn` to start the *Express* server in a non-blocking way (Note: `exec` wouldn't work as it won't let the task finish).
+ `watch` &mdash; runs `serve` task and then watches for changes on source code artifacts and runs `serve` when a change is detected.


**Notes**
+ If *Gulp* is not installed globally, you will have to pick it up from `./node_modules/.bin` as in:
```bash
$ ./node_modules/.bin/gulp
```

+ Gulp task dependencies are not executed in series, but in parallel. Therefore, it's important to make explicit simple dependencies between tasks.
For example the following task will not work as expected because `copy` might be executed before `clean` even when `lint` fails (facepalm).
```javascript
gulp.task("build", ["clean", "lint", "copy"]);
```
