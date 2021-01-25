"use strict";

const tap = require("tap");
const Database = require("../src/lib/database");
const { join } = require("path");
const fs = require("fs");
const { promisify } = require("util");

const writeFileAsync = promisify(fs.writeFile);

/* test 0: module is properly loaded */
tap.test("module is properly loaded", assert => {
  assert.ok(Database);
  assert.end();
});


/* test 1: get from empty db returns null */
tap.test("get from empty db returns null", assert => {
  /* Arrange */
  assert.plan(1);

  const dbLogFile = join(__dirname, "journal-fixtures", `db-data-${ new Date().toISOString() }`);
  const client = new Database(dbLogFile);
  client.on("load", async () => {

    /* Act */
    const value = await client.get("key");

    /* Assert */
    assert.equal(value, null);
  });
});


/* test 2: get after set returns the result (primitives) */
tap.test("get after set returns the result (primitives)", assert => {
  /* Arrange */
  assert.plan(1);

  const dbLogFile = join(__dirname, "journal-fixtures", `db-data-${ new Date().toISOString() }`);
  const client = new Database(dbLogFile);
  client.on("load", async () => {

    /* Act */
    await client.set("one", 1);
    const value = await client.get("one");
    
    /* Assert */
    assert.equal(value, 1);
  });
});


/* test 3: get after set return the result (object) */
tap.test("get after set returns the result (object)", assert => {
  /* Arrange */
  assert.plan(1);
  
  const dbLogFile = join(__dirname, "journal-fixtures", `db-data-${ new Date().toISOString() }`);
  const client = new Database(dbLogFile);
  client.on("load", async () => {

    /* Act */
    await client.set("obj", { key1: "value1", key2: { key: "value" } });
    const value = await client.get("obj");
    
    /* Assert */
    assert.deepEqual(value,  { key1: "value1", key2: { key: "value" } });
  });
});

/* test 4: get after set delete returns null */
tap.test("get after set+delete returns null", assert => {
  /* Arrange */
  assert.plan(1);

  const dbLogFile = join(__dirname, "journal-fixtures", `db-data-${ new Date().toISOString() }`);
  const client = new Database(dbLogFile);
  client.on("load", async () => {

    /* Act */
    await client.set("key", "value");
    await client.del("key");
    const value = await client.get("key");
    
    /* Assert */
    assert.equal(value, null);
  });
});

/* test 6: values are updated after set */
tap.test("values are updated after set", assert => {
  /* Arrange */
  assert.plan(1);

  const dbLogFile = join(__dirname, "journal-fixtures", `db-data-${ new Date().toISOString() }`);
  const client = new Database(dbLogFile);
  client.on("load", async () => {

    /* Act */
    await client.set("key", "value1");
    await client.set("key", "value2");
    const value = await client.get("key");
    
    /* Assert */
    assert.equal(value,  "value2");
  });
});

/* test 5: values are recovered after stopping the db */
tap.test("values are recovered after stopping the db", assert => {
  assert.plan(1);

  /* Arrange */
  const dbLogFile = join(__dirname, "journal-fixtures", `db-data-${ new Date().toISOString() }`);  
  const record = `${ JSON.stringify({key: "greeting", value: "Hello to Jason Isaacs!" }) }\n`;
  writeFileAsync(dbLogFile, record, { encoding: "utf8" })
    .then(() => {
      const client = new Database(dbLogFile);
      client.on("load", async () => {
        /* Act */
        const value = await client.get("greeting");
        
        /* Assert */
        assert.equal(value,  "Hello to Jason Isaacs!");
      });
    });
});

