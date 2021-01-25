"use strict";

const { promisify } = require("util");
const fs = require("fs");
const dns = require("dns");
const readFileAsync = promisify(fs.readFile);
const dnsLookupAsync = promisify(dns.lookup);

/* Callback-based */
(() => {
  fs.readFile(`./package.json`, (err, data) => {
    if (err) {
      console.log(`Error reading the file: ${ err.message }`);
      throw err;
    }
    console.log(data.toString());
  });
})();

/* Using promisify and promises */
(()=> {
  readFileAsync("./package.json")
    .then(data => {
      console.log(data.toString());
    })
    .catch(err => {
      console.log(`Error reading file: ${ err.message }`);
      throw err;
    });
})();

/* using promisify and async/await */
(async ()=> {
  try {
    const data = await readFileAsync("./package.json");
    console.log(data.toString());
  } catch (err) {
    console.log(`Error reading file: ${ err.message }`);
    throw err;
  }
})();

/* functions returning several values: callbacks */
(async ()=> {
  dns.lookup("nodejs.org", (err, address, family) => {
    if(err) {
      console.log(`Error getting DNS information: ${ err.message }`);
      throw err;
    }
    console.log(`address: ${ address }, family: ${ family }`);
  });
})();

/* functions returning several values: promises */
(async ()=> {
  dnsLookupAsync("nodejs.org")
    .then(resp => {
      console.log(resp); // we get an object with the values as properties
    })
    .catch(err => {
      console.log(`Error getting DNS information: ${ err.message }`);
      throw err;
    });
})();

/* functions returning several values: async */
(async ()=> {
  try {
    const resp = await dnsLookupAsync("nodejs.org");
    console.log(resp);
  } catch (err) {
    console.log(`Error getting DNS information: ${ err.message }`);
    throw err;
  }
})();