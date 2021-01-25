"use strict";

const spawn = require("child_process").spawn;
const gulp = require("gulp");
const clean = require("gulp-clean");
const eslint = require("gulp-eslint");


gulp.task("default", ["watch"] );


gulp.task("clean", () => {
  return gulp.src("build/", {read: false})
    .pipe(clean());
});

gulp.task("lint", () => {
  return gulp.src("src/**/*.js")
    .pipe(eslint())
    .pipe(eslint.format())
    .pipe(eslint.failAfterError());
});


gulp.task("build", ["lint"], () => {
  return gulp.src("src/**")
    .pipe(gulp.dest("build/"));
});


gulp.task("serve", ["build"], () => {
  const expressServer = spawn("node", ["build/index.js"]);
  expressServer.stdout.on("data", data => {
    console.log(`express server stdout: ${data}`);
  });

  expressServer.stdout.on("err", data => {
    console.log(`express server stderr: ${data}`);
  });

  expressServer.on("close", code => {
    console.log(`express server has exited with code ${code}`);
  });
});

gulp.task("watch", ["serve"], () => {
  const watcher = gulp.watch("src/**/*.{js,html,png,jpg,jpeg,json}", ["serve"]);
  watcher.on("change", event => {
    console.log(`File ${event.path} was ${event.type}, running tasks...`);
  });
});
