'use strict';

const tap = require('tap');
const sinon = require('sinon');
const maxwell = require('../src/index');



tap.test('maxwell.immediate invokes a callback immediately', assert => {
  const cb = sinon.spy();

  maxwell.immediate(cb);

  assert.ok(cb.calledOnce, 'called once');
  assert.ok(cb.calledWith('foo', 'bar'), 'arguments match expectation');
  assert.end();
});

tap.test('maxwell.debounce invokes a callback after a timeout', assert => {
  const clock = sinon.useFakeTimers();
  const cb = sinon.spy();

  maxwell.debounce(cb);
  assert.ok(cb.notCalled, 'not called before tick');
  clock.tick(0);
  assert.ok(cb.called, 'called after tick');
  assert.end();
});