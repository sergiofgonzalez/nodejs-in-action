"use strict";

const fs = require("fs");
const path = require("path");


const readable = fs.createReadStream(path.join(__dirname, "data", "file.txt"));
const writable = fs.createWriteStream(path.join(__dirname, "data", "file-copy.txt"));

readable.pipe(writable);