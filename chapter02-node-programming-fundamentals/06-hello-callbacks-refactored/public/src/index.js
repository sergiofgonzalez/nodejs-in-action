"use strict";

const http = require("http");
const fs = require("fs");

const port = 5000;
const bindingIP = "127.0.0.1";

http.createServer(function (req, res) {
  if (req.url === "/") {
    getTitles(res);
  } else {
    handleNoMappingError(req, res);
  }
}).listen(port, bindingIP);  // The second parameter is used to prevent binding from outside localhost

console.log(`Server established on port ${port} and only accessible from ${bindingIP}`);


function getTitles(response) {
  fs.readFile(__dirname + "/titles.json", (err, data) => {
    if (err) {
      return hadError(err, response);
    }
    getTemplate(JSON.parse(data.toString()), response);
  });
}

function getTemplate(titles, response) {
  fs.readFile(__dirname + "/template.html", function (err, data) {
    if (err) {
      return hadError(err, response);
    }
    var tmpl = data.toString();
    var html = tmpl.replace("%", titles.join("</li><li>")); // Replace "%" with the titles joined by "</li><li>" as separator
    response.writeHead(200, { "Content-Type": "text/html" });
    response.end(html);
  });
}

function hadError(err, response) {
  if (err) {
    console.error(err);
    response.writeHead(500);
    response.end("Server Error (2)");
  }
}

function handleNoMappingError(request, response) {
  console.log(`Request received for ${request.url} has no mappings.`);
  response.writeHead(404);
  response.end("Not Found");
}