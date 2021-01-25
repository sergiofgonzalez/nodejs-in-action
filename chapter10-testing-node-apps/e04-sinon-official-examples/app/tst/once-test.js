'use strict';

const tap = require('tap');
const sinon = require('sinon');
const once = require('../src/index');

tap.test('calls the original function', assert => {
  const cb = sinon.fake();
  
  const proxy = once(cb);
  proxy();

  assert.ok(cb.called, 'callback is called');
  assert.end();
});

tap.test('calls the original function only once', assert => {
  const cb = sinon.fake();
  const proxy = once(cb);

  proxy();
  proxy();

  assert.ok(cb.calledOnce, 'callback is called only once');
  assert.end();
});

tap.test('calls the original function with the expected args', assert => {
  const cb = sinon.fake();
  const proxy = once(cb);
  const obj = {};

  proxy.call(obj, 1, 2, 3);

  assert.ok(cb.calledOn(obj), 'callback called with the expected this');
  assert.ok((cb.calledWith(1, 2, 3), 'callback called with expected parameters'));
  assert.end(); 
});

tap.test('the behavior is the expected once', assert => {
  const cb = sinon.fake.returns(55);
  const proxy = once(cb);

  const result = proxy();

  assert.strictEquals(result, 55, 'expected result');
  assert.end();
});