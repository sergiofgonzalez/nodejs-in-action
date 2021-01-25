'use strict';

const tap = require('tap');
const sinon = require('sinon');

/* 
  noCallhru: prevent proxyquire to call the original dep when not found on the stub.
  As the module is 'simple-get' is not on the package.json, we need this
*/
const proxyquire = require('proxyquire').noCallThru();  


tap.test('testing the mocked function', assert => {
  const fetchMock = proxyquire('../src/lib/get', {
    'simple-get': (url, cb) => {
      process.nextTick(() => cb(null, { statusCode: 200 }));
    }
  }); 

  fetchMock((err, res) => {
    assert.strictEquals(res.statusCode, 200);
    assert.end();
  });
});

tap.test('Now with sinon spies too', assert => {
  // Arrange
  const clock = sinon.useFakeTimers();
  const cb = sinon.spy();
  const fetchMock = proxyquire('../src/lib/get', {
    'simple-get': (url, cb) => {
      clock.nextTick(() => cb(null, { statusCode: 200 })); // cant's use process.nextTick
    }
  }); 


  // Act
  fetchMock(cb);
  clock.tick(0);

  // Assert
  const res = cb.args[0][1];
  assert.strictEquals(res.statusCode, 200);
  assert.ok(cb.calledOnce);
  assert.end();
});

tap.test('Now with sinon spies too', assert => {
  // Arrange
  const clock = sinon.useFakeTimers({ toFake: [ 'nextTick' ]});
  const cb = sinon.spy();
  const fetchMock = proxyquire('../src/lib/get', {
    'simple-get': (url, cb) => {
      process.nextTick(() => cb(null, { statusCode: 200 })); // cant's use process.nextTick
    }
  }); 


  // Act
  fetchMock(cb);
  clock.tick(0);

  // Assert
  const res = cb.args[0][1];
  assert.strictEquals(res.statusCode, 200);
  assert.ok(cb.calledOnce);
  assert.end();
});