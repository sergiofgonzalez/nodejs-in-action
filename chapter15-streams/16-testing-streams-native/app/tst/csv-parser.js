"use strict";

const assert = require("assert");
const path = require("path");
const fs = require("fs");
const CSVParser = require("../src/lib/csv-parser");


const parser = new CSVParser();
const actual = [];

fs.createReadStream(path.join(__dirname, "data", "sample.csv"))
  .pipe(parser);

process.on("exit", () => {
  actual.push(parser.read());
  actual.push(parser.read());
  actual.push(parser.read());

  const expected = [
    { name: "Jason", location: "UK", role: "admin" },
    { name: "Idris", location: "France", role: "user" },
    { name: "Ahmed", location: "Canada", role: "user" }
  ];

  assert.deepEqual(expected, actual);
});

