"use strict";

const http = require("http");
const fs = require("fs");

http.createServer(function (req, res) {
  if (req.url === "/") {
    fs.readFile(__dirname + "/titles.json", function (err, data) {
      if (err) {
        console.error(err);
        res.writeHead(500);
        res.end("Server Error (1)");
      } else {
        var titles = JSON.parse(data.toString());
        fs.readFile(__dirname + "/template.html", function (err, data) {
          if (err) {
            console.error(err);
            res.writeHead(500);
            res.end("Server Error (2)");
          } else {
            var tmpl = data.toString();
            var html = tmpl.replace("%", titles.join("</li><li>")); // Replace "%" with the titles joined by "</li><li>" as separator
            res.writeHead(200, {"Content-Type": "text/html"});
            res.end(html);
          }
        });
      }
    });
  } else {
    console.log("Request received for " + req.url + " has no mappings.");
    res.writeHead(404);
    res.end("Not Found");
  }
}).listen(5000, "127.0.0.1");  // The second parameter is used to prevent binding from outside localhost

console.log("Server established on port 5000 and only accessible from localhost");
