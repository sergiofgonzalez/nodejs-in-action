"use strict";

const gulp = require("gulp-help")(require("gulp"));

gulp.task("build", "Copies contents of `src/` into `build/`. Depends on", ["lint"], () => {
  return gulp.src("./src/**")
    .pipe(gulp.dest("./build/"));
});
