"use strict";

const path = require("path");
const util = require("util");

const Database = require("./lib/database");
util.inspect.defaultOptions.depth = null;

const client = new Database(path.join(__dirname, "data", "db-journal.log"));

client.on("load", () => {
  console.log("Database successfully loaded into memory!");

  // writing an object as the value
  client.set("actor", {name: "Jason Isaacs", age: "45", greeting: "Hello to Jason Isaacs" }, err => {
    if (err) {
      console.log("Error setting value:", err.message);
    }
  });

  // writing simple values
  client.set("catorce", 14, err => {
    if (err) {
      console.log("Error setting value:", err.message);
    }
  });
  client.set("idris", "elba",err => {
    if (err) {
      console.log("Error setting value:", err.message);
    }
  });

  // retrieving what we inserted (after some time to let the async operations complete)
  setTimeout(() => {
    console.log("==== reading inserted values");
    console.log(`catorce=${ client.get("catorce") }`);
    console.log(`idris=${ client.get("idris") }`);
    console.log(`actor=${ util.inspect(client.get("actor")) }`);
  }, 2000);


  // updating what we inserted
  setTimeout(() => {
    console.log("==== updating");
    client.set("catorce", "catorce",err => {
      if (err) {
        console.log("Error setting value:", err.message);
      }
    });
    client.set("actor", { name: "Idris Elba" }, err => {
      if (err) {
        console.log("Error setting value:", err.message);
      }
    });
  }, 4000);


  setTimeout(() => {
    console.log("Retrieving after updating");
    console.log(`catorce=${ client.get("catorce") }`);
    console.log(`idris=${ client.get("idris") }`);
    console.log(`actor=${ util.inspect(client.get("actor")) }`);
  }, 6000);


  // deleting entries
  setTimeout(() => {
    client.del("catorce");
    client.del("actor");
  }, 8000);

  setTimeout(() => {
    console.log("Retrieving after deletion");
    console.log(`catorce=${ client.get("catorce") }`);
    console.log(`idris=${ client.get("idris") }`);
    console.log(`actor=${ client.get("actor") }`);
  }, 10000);

});