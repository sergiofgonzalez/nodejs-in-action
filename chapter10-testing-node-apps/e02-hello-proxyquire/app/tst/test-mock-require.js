'use strict';

const tap = require('tap');
const proxyquire = require('proxyquire');
const sinon = require('sinon');

const user = {
  id: 123,
  name: 'Marian',
  email: 'marian@company.com'
};

const findUserByIdMock = {
  './user.js': {
    findOne(query, done) {
      setTimeout(done.bind(null, null, user));
    }
  }
};




tap.test('findUserById returns a subset of user', assert => {
  // Arrange
  const findUserById = proxyquire('../src/lib/find-user-by-id', findUserByIdMock);
  const clock = sinon.useFakeTimers();
  const cb = sinon.spy();

  // Act
  findUserById(111, cb);
  clock.tick(0);
  const result = cb.args[0][1];
  const actual = Object.keys(result).sort;
  const expected = ['name', 'email'].sort;

  // Assert
  assert.ok(cb.calledOnce, 'called once');
  assert.deepEquals(actual, expected);
  assert.end();
});


