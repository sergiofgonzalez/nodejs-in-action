"use strict";

const fs = require("fs");
const path = require("path");
const http = require("http");
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
  let output = `
<!DOCTYPE html>
<html lang="en">
  <head>
    <!-- Required meta tags -->
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">

    <title>Welcome to my blog!</title>

    <!-- Bootstrap CSS -->
    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0-alpha.6/css/bootstrap.min.css" integrity="sha384-rwoIResjU2yc3z8GV/NPeZWAv56rSmLldC3R/AZzGRnGxQQKnKkoFVhFQhNUwEyJ" crossorigin="anonymous">

    <!-- Custom CSS -->
    <link rel="stylesheet" href="stylesheets/styles1.css">

  </head>
  <body>
    <!-- Have a look at the console while running this -->
    <div class="jumbotron">
      <h1 class="display-3">Welcome to my blog!</h1>
      <hr class="my-4">
      <p class="lead">
        Displaying a website without a template engine.
      </p>      
    </div>
    <div class="container">
  `;

  entries.forEach(entry => {
    output += `
<div class="card">
  <div class="card-block">
    <h4 class="card-title">${ entry.title }</h4>
    <h6 class="card-subtitle mb-2 text-muted">${ entry.date }</h6>
    <p class="card-text">${ entry.body }</p>
  </div>
</div>     
    `;
  });
  output += `</div></body></html>`;
  return output;
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
