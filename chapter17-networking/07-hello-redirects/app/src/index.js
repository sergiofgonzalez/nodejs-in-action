"use strict";

const http = require("http");
const https = require("https");
const url = require("url");

let request;

class Request {
  constructor() {
    this.maxRedirects = 10;
    this.redirects = 0;
  }

  get(href, cb) {
    const uri = url.parse(href);
    const options = { host: uri.host, path: uri. path };
    const httpGet = uri.protocol === "http:" ? http.get : https.get;

    console.log("GET:", href);

    function processResponse(res) {
      if (res.statusCode >= 300 && res.statusCode < 400) {
        if (this.redirects >= this.maxRedirects) {
          this.error = new Error(`Too many redirects for: ${ href }`);
        } else {
          this.redirects++;
          href = url.resolve(options.host, res.headers.location);
          return this.get(href, cb);
        }
      }
      res.url = href;
      res.redirects = this.redirects;

      console.log("Redirected:", href);

      function end() {
        console.log(`Connection ended: redirects taken: ${ this.redirects }`);
        cb(this.error, res);
      }

      res.on("data", data => {
        console.log("Got data, length:", data.length);
      });

      res.on("end", end.bind(this));
    }

    httpGet(options, processResponse.bind(this))
      .on("error", err => cb(err));
  }
}

request = new Request();
request.get("http://google.com", (err, res) => {
  if (err) {
    console.error(err);
  } else {
    console.log(`Fetched URL: ${ res.url } with ${ res.redirects } redirect(s)`);
    process.exit();
  }
});

