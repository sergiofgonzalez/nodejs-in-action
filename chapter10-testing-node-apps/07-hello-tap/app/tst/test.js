"use strict";

const tap = require("tap");
const SomeClass = require("../src/lib/some-lib.js"); 

/* check that the test file can be run */
tap.pass("Test can be executed");

/* check that the library is correctly loaded */
tap.test("Library path is ok", assert => {
  assert.plan(1);
  assert.ok(SomeClass);
});

/* basic test using assertions and assert.end */
tap.test("SomeClass can be built without params", assert => {
  const obj = new SomeClass();
  assert.ok(obj);
  assert.end();
});

/* alt basic test using assertions and assert.plan */
tap.test("SomeClass can be built with params", assert => {
  assert.plan(1);
  const obj = new SomeClass("Jason Isaacs");
  assert.ok(obj);
});

/* testing sync stuff is extremely easy */
tap.test("Sync Greeting wo params", assert => {
  assert.plan(1);
  const greeter = new SomeClass();
  assert.equal(greeter.getGreetingSync(), "Hello to unknown someone!");
});

/* testing sync stuff is extremely easy */
tap.test("Sync Greeting wo params", assert => {
  assert.plan(1);
  const greeter = new SomeClass("Jason Isaacs");
  assert.equal(greeter.getGreetingSync(), "Hello to Jason Isaacs!");
});

/* testing async stuff is extremely easy */
tap.test("Sync Greeting wo params", assert => {
  assert.plan(1);
  const greeter = new SomeClass();
  assert.equal(greeter.getGreetingSync(), "Hello to unknown someone!");
});

/* testing async stuff is also easy */
tap.test("Sync Greeting wo params", async assert => {
  assert.plan(1);

  const greeter = new SomeClass("Jason Isaacs");
  const greeting = await greeter.getGreetingAsync();
  assert.equal(greeting, "Hello to Jason Isaacs!");
});

/* testing async stuff is extremely easy with Promises as well */
tap.test("Sync Greeting wo params", assert => {
  assert.plan(1);

  const greeter = new SomeClass("Jason Isaacs");
  greeter.getGreetingAsync()
    .then(greeting => assert.equal(greeting, "Hello to Jason Isaacs!"));
});

