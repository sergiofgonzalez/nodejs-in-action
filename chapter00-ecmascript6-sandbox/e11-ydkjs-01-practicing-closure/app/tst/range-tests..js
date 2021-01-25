'use strict';

const tap = require('tap');
const range = require('../src/index');

tap.pass('File can be executed');

tap.test('Library can be loaded', assert => {
  assert.ok(range);
  assert.end();
});

tap.test('uc1', assert => {
  const result = range(3, 3);
  assert.true(Array.isArray(result));
  assert.deepEquals(result, [3]);
  assert.end();
});

tap.test('uc2', assert => {
  const result = range(3, 8);
  assert.true(Array.isArray(result));
  assert.deepEquals(result, [3, 4, 5, 6, 7, 8]);
  assert.end();
});

tap.test('uc3', assert => {
  const result = range(3, 0);
  assert.true(Array.isArray(result));
  assert.deepEquals(result, []);
  assert.end();
});

tap.test('uc4', assert => {
  const start3 = range(3);
  assert.type(start3, 'function');
  assert.deepEquals(start3(3), [3]);
  assert.deepEquals(start3(8), [3, 4, 5, 6, 7, 8]);
  assert.deepEquals(start3(0), []);
  assert.end();
});

tap.test('uc5', assert => {
  const start4 = range(4);
  assert.type(start4, 'function');
  assert.deepEquals(start4(6), [4, 5, 6]);
  assert.end();
});