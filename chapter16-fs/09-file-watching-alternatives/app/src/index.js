"use strict";

const fs = require("fs");
const path = require("path");


fs.watch(path.join(__dirname, "./watched-dir"), console.log);
fs.watchFile(path.join(__dirname, "./watched-dir"), console.log);