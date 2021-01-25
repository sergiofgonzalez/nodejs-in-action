"use strict";

const gulp = require("gulp-help")(require("gulp"));
const eslint = require("gulp-eslint");

gulp.task("lint", "Lints all JavaScript source code under `src/`", () => {
  return gulp.src("./src/**/*.js")
    .pipe(eslint())
    .pipe(eslint.format())
    .pipe(eslint.failAfterError());
});
