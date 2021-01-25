"use strict";

const dns = require("dns");

/* dns.lookup is backed by a threadpool */
dns.lookup("github.com", (err, address) => {
  if (err) {
    console.log("Error found using dns.lookup", err.message);
    process.exit(1);
  }
  console.log(`Addresses (dns.lookup):`, address);
});

/* dns.resolve using c-ares lib */
dns.resolve("github.com", (err, address) => {
  if (err) {
    console.log("Error found using dns.lookup", err.message);
    process.exit(1);
  }
  console.log(`Addresses (dns.resolve):`, address);  
});