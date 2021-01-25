'use strict';

const tap = require('tap');
const scheduleMeeting = require('../src/index');

tap.pass('File can be executed');

tap.test('Library can be loaded', assert => {
  assert.ok(scheduleMeeting);
  assert.end();
});

tap.test('uc1', assert => {
  assert.false(scheduleMeeting('7:00', 15));
  assert.end();
});

tap.test('uc2', assert => {
  assert.false(scheduleMeeting('07:15', 30));
  assert.end();
});

tap.test('uc3', assert => {
  assert.true(scheduleMeeting('7:30', 30));
  assert.end();
});

tap.test('uc4', assert => {
  assert.true(scheduleMeeting('11:30', 60));
  assert.end();
});

tap.test('uc5', assert => {
  assert.true(scheduleMeeting('17:00', 45));
  assert.end();
});

tap.test('uc6', assert => {
  assert.false(scheduleMeeting('17:30', 30));
  assert.end();
});

tap.test('uc7', assert => {
  assert.false(scheduleMeeting('18:00', 15));
  assert.end();
});