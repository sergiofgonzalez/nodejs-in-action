/* eslint-disable no-unused-vars */
import tap from 'tap';
import { Thenable } from '../src/thenable.js';


tap.test('set of fulfilled promises', async assert => {
  const iterablePromises = [Promise.resolve(1), Promise.resolve(2), Promise.resolve(3)];
  const iterableValues = [4, 5, 6];
  const iterableThenables = [
    new Thenable().then(onFulfilled => onFulfilled(7)),
    new Thenable().then(onFulfilled => onFulfilled(8)),
    new Thenable().then(onFulfilled => onFulfilled(9)),
  ];

  const iterable = [...iterablePromises, ...iterableValues, ...iterableThenables ];

  const promiseAllResult = Promise.all(iterable);
  assert.resolves(promiseAllResult);
  const fulfillmentValues = await promiseAllResult;
  assert.same(fulfillmentValues, [1, 2, 3, 4, 5, 6, 7, 8, 9]);
  assert.end();
});

tap.test('set of fulfilled and rejected promises: promise 1 fails', async assert => {
  const iterablePromises = [Promise.reject(new Error('rejected promise')), Promise.resolve(2), Promise.resolve(3)];
  const iterableValues = [4, 5, 6];
  const iterableThenables = [
    new Thenable().then(onFulfilled => onFulfilled(7)),
    new Thenable().then(onFulfilled => onFulfilled(8)),
    new Thenable().then(onFulfilled => onFulfilled(9)),
  ];

  const iterable = [...iterablePromises, ...iterableValues, ...iterableThenables ];

  const promiseAllResult = Promise.all(iterable);
  assert.rejects(promiseAllResult, new Error('rejected promise'));
  assert.end();
});

