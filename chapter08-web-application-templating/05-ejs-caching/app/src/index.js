"use strict";

const fs = require("fs");
const path = require("path");
const http = require("http");
const ejs = require("ejs");
const util = require("util");
util.inspect.defaultOptions.depth = null;

const isCacheEnabled = process.env.NODE_ENV === "production";

const filename = "./templates/students.ejs";
const students = [
  { name: "Jason Isaacs", age: 43 },
  { name: "Riz Ahmed", age: 27 },
  { name: "Idris Elba", age: 38 }
];

const server = http.createServer((req, res) => {
  if (req.url === "/") {
    fs.readFile(path.join(__dirname, filename), (err, data) => {
      const template = data.toString();
      const context = { students };
      const output = ejs.render(template, context, { cache: isCacheEnabled, filename: filename });
      res.setHeader("Content-Type", "text/html");
      res.end(output);
    });
  } else {
    res.statusCode = 404;
    res.end("Not found");
  }
});


console.log(`NODE_ENV=${ process.env.NODE_ENV }`);
console.log(`isCacheEnabled=${ isCacheEnabled }`);
console.log("Server listening on port 5000");
server.listen(5000);