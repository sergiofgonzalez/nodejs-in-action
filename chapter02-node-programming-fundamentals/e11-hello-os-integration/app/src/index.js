"use strict";

/* getting platform information */
console.log(`architecture: ${ process.arch }`);
// rss: resident set size (portion of the process' memory held in RAM)
// heapTotal: memory available for dynamic allocation (V8)
// heapUsed: amount of heap used (V8)
// external: memory usage of C++ objects bound to JavaScript objects managed by V8
console.log(`memory usage:`, process.memoryUsage()); 

/* getting arguments from the command line with process.argv */
const args = {
  "-h" : displayHelp,
  "-r" : readFile
};

function displayHelp() {
  console.log("Run with the following arguments: ", args);
}

function readFile(file) {
  console.log("Reading some file:", file);
}


if (process.argv.length > 2) {
  let i = 2;
  while (i < process.argv.length) {
    const actionArg = process.argv[i];
    const action = args[actionArg];
    const argValue = process.argv.slice(i + 1, i + 2);
    if (!action || !argValue) {
      if (!action) console.error("Unrecognized option:", actionArg);
      if (!argValue) console.error("missing required argument for:", actionArg);
      displayHelp();
      process.exit(1);
    } else {
      console.log(action);
      action.apply(this, argValue); // call the method held in the variable action passing the extracted argument value
    }
    i += 2;
  }
}

/* obtaining the process ID */
console.log("Process ID:", process.pid);

/* listening to OS signals */
process.on("SIGHUP", () => console.log("SIGHUP signal received"));
process.on("SIGTERM", () => console.log("SIGTERM signal received"));
process.on("SIGINT", () => console.log("SIGINT signal received"));

console.log("Doing nothing for 10 seconds");
setTimeout(() => {}, 10 * 1000);