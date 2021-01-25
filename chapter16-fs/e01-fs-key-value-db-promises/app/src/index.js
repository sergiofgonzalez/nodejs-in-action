"use strict";

const path = require("path");
const util = require("util");

const Database = require("./lib/database");
util.inspect.defaultOptions.depth = null;

const client = new Database(path.join(__dirname, "data", "db-journal.log"));

client.on("load", async () => {
  console.log("Database successfully loaded into memory!");

  console.log(`idris=${ await client.get("idris") }`);

  try {
    await Promise.all([
      client.set("actor", {name: "Jason Isaacs", age: "45", greeting: "Hello to Jason Isaacs" }),
      client.set("catorce", 14),
      client.set("idris", "elba")
    ]);

    console.log("==== reading inserted values");
    console.log(`catorce=${ await client.get("catorce") }`);
    console.log(`idris=${ await client.get("idris") }`);
    console.log(`actor=${ util.inspect(await client.get("actor")) }`);

    console.log("==== updating");
    await client.set("catorce", "catorce");
    await client.set("actor", { name: "Idris Elba" });

    console.log("==== retrieving after updating");
    console.log(`catorce=${ await client.get("catorce") }`);
    console.log(`idris=${ await client.get("idris") }`);
    console.log(`actor=${ await util.inspect(client.get("actor")) }`);
    

    // deleting entries
    console.log("==== deleting");
    await client.del("catorce");
    await client.del("actor");

    console.log("retrieving after deletion");
    console.log(`catorce=${ await client.get("catorce") }`);
    console.log(`idris=${ await client.get("idris") }`);
    console.log(`actor=${ await client.get("actor") }`);

  } catch (e) {
    console.log("Error while testing the database:", e);
  }
});

client.on("error", (message, record) => {
  console.log(`Client error found: ${ message }, record=${ util.inspect(record) }`);
});