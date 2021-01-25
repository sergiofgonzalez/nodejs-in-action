"use strict";

const gulp = require("gulp-help")(require("gulp"));
const clean = require("gulp-clean");

gulp.task("clean", "Removes `build/` directory and its contents", () => {
  return gulp.src("./build/", {read: false})
    .pipe(clean());
});
