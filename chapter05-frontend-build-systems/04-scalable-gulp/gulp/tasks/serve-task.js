"use strict";

const gulp = require("gulp-help")(require("gulp"));
const spawn = require("child_process").spawn;

gulp.task("serve", "Reserved: Use `gulp watch` instead. Depends on", ["build"], () => {
  console.log("**NOTE:** Use task watch instead to start the server");

  const expressServer = spawn("node", ["./build/index.js"]);
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
