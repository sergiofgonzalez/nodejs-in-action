"use strict";

const tap = require("tap");
const fs = require("fs");
const CountStream = require("../src/lib/countstream");



tap.test("total on current file should be one", childTest => {
  const countStream = new CountStream("example");
  fs.createReadStream(__filename).pipe(countStream);
  countStream.on("total", count => {
    childTest.equal(count, 1);
    childTest.end();
  });
});

tap.test("total on current file should be zero", childTest => {
  const foo = "foo";
  const bar = "bar";
  const countStream = new CountStream(`${ foo }${ bar }`);
  fs.createReadStream(__filename).pipe(countStream);
  countStream.on("total", count => {
    childTest.equal(count, 1);
    childTest.end();
  });
});