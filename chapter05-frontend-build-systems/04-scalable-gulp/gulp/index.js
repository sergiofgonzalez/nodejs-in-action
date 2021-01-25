"use strict";

const fs = require("fs");

console.log(`Loading tasks...`);

fs.readdirSync("./gulp/tasks").forEach(file => {
  if (file.endsWith("-task.js")) {
    require(`./tasks/${file}`);
  } else {
    console.log(`File ${file} does not look like a task file and has been ignored`);
  }
});
