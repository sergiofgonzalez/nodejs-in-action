"use strict";

const tap = require("tap");
const basicAuth = require("../src/lib/basic-auth");


/* .getAuthHeader */

tap.test("Get Auth header from valid credentials is OK", async (assert) => {
  const authHeader = await basicAuth.getAuthHeader("sergio.f.gonzalez", "daleksLuv");
  assert.equals(authHeader, "Authorization: c2VyZ2lvLmYuZ29uemFsZXo6ZGFsZWtzTHV2");
  assert.end();
});

tap.test("Get Auth header from empty credentials is OK", async (assert) => {
  const authHeader = await basicAuth.getAuthHeader();
  assert.equals(authHeader, "Authorization: dW5kZWZpbmVkOnVuZGVmaW5lZA==");
  assert.end();
});


/* .getCredentials */

tap.test("Get credentials from valid auth header is OK", async (assert) => {
  const credentials = await basicAuth.getCredentials("Authorization: c2VyZ2lvLmYuZ29uemFsZXo6ZGFsZWtzTHV2");
  assert.deepEquals(credentials, { user: "sergio.f.gonzalez", password: "daleksLuv" });
  assert.end();
});

// I haven't been able to use assert.throws thus far :(
tap.test("Get credentials from empty auth header throws (Promises)", (assert) => {
  basicAuth.getCredentials()
    .then(() => { 
      assert.fail(); 
      assert.end(); 
    })
    .catch(() => assert.end());
});

tap.test("Get credentials from empty auth header throws (async)", async (assert) => {
  try {
    await basicAuth.getCredentials();
    assert.fail();
    assert.end();
  } catch (e) {
    assert.pass();
    assert.end();
  }
});


tap.test("Get credentials from non valid auth header throws (Promises)", (assert) => {
  basicAuth.getCredentials("This is not an auth header")
    .then(() => { 
      assert.fail(); 
      assert.end(); 
    })
    .catch(() => assert.end());
});

tap.test("Get credentials from empty auth header throws (async)", async (assert) => {
  try {
    await basicAuth.getCredentials("This is not an auth header");
    assert.fail();
    assert.end();
  } catch (e) {
    assert.pass();
    assert.end();
  }
});

tap.test("Get credentials from non valid auth header throws (Promises)", (assert) => {
  basicAuth.getCredentials("X-Authorization: c2VyZ2lvLmYuZ29uemFsZXo6ZGFsZWtzTHV2")
    .then(() => { 
      assert.fail(); 
      assert.end(); 
    })
    .catch(() => assert.end());
});

tap.test("Get credentials from empty auth header throws (async)", async (assert) => {
  try {
    await basicAuth.getCredentials("X-Authorization: c2VyZ2lvLmYuZ29uemFsZXo6ZGFsZWtzTHV2");
    assert.fail();
    assert.end();
  } catch (e) {
    assert.pass();
    assert.end();
  }
});