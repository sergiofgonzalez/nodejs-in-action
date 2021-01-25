"use strict";

const gulp = require("gulp-help")(require("gulp"));


gulp.task("watch", "Watches sources of `src/` for changes and restarts a Node.js server to serve the frontend. Depends on", ["serve"], () => {
  const watcher = gulp.watch("src/**/*{.js,.html,.jpeg,.jpg,.json}", ["serve"]);
  watcher.on("change", event => {
    console.log(`File ${event.path} was ${event.type}, running tasks...`);
  });
});