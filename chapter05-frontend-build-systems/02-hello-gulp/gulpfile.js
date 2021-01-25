"use strict";

const gulp = require("gulp");
const sourcemaps = require("gulp-sourcemaps");
const babel = require("gulp-babel");
const concat = require("gulp-concat");
const watch = require("gulp-watch");

gulp.task("default", () => {
  return gulp.src("app/*.jsx")                            // find all input files using globbing
          .pipe(sourcemaps.init())                        // watch source files to build sourcemaps for debugging
          .pipe(babel({presets: ["es2015", "react"]}))    // configure babel
          .pipe(concat("all.js"))                         // concat all source files together into an `all.js`
          .pipe(sourcemaps.write("."))                    // write sourcemap files separately
          .pipe(gulp.dest("build"));                       // redirect all files to `dist/`
});

gulp.task("watch", () => {
  watch("app/**.jsx", () => gulp.start("default"));
});