"use strict";

const fs = require("fs");
const path = require("path");
const http = require("http");
const ejs = require("ejs");
const util = require("util");
util.inspect.defaultOptions.depth = null;


function getEntries() {
  const entries = [];
  let entriesRaw = fs.readFileSync(path.join(__dirname, "./blog-entries/entries.txt"), "utf8");
  entriesRaw = entriesRaw.split("---");
  entriesRaw.map(entryRaw => {
    const entry = {};
    const lines = entryRaw.split("\n");
    lines.map(line => {
      if (line.indexOf("title: ") === 0) {
        entry.title = line.replace("title: ", "");
      } else if (line.indexOf("date: ") === 0) {
        entry.date = line.replace("date: ", "");
      } else {
        entry.body = entry.body || "";
        entry.body += ` ${ line }`;
      }
    });
    entries.push(entry);
  });
  return entries;
}

function blogPage(entries) {
  const template = fs.readFileSync(path.join(__dirname, "./templates/blog-page.ejs"), "utf8");
  const values = { entries };
  return ejs.render(template, values);
}


const server = http.createServer((req, res) => {
  const entries = getEntries();
  console.log(`entries = ${ util.inspect(entries) }`);
  const output = blogPage(getEntries());
  res.writeHead(200, { "Content-Type": "text/html" });
  res.end(output);
});





server.listen(5000);

console.log("Server established on port 5000");
