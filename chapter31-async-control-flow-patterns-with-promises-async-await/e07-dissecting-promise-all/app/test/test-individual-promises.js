import tap from 'tap';

tap.test('asserting fulfilled promise with then', assert => {
  const p = Promise.resolve(5)
    .then(result => {
      assert.resolves(p);
      assert.equals(result, 5);
      assert.end();
    });
});

tap.test('asserting fulfilled promise with async/await', async assert => {
  const p = Promise.resolve(5);
  assert.resolves(p);
  const result = await p;
  assert.equals(result, 5);
  assert.end();
});

tap.test('asserting rejected promise with then', assert => {
  const p = Promise.reject(new Error('rejected promise'));
  assert.rejects(p, new Error('rejected promise'));
  assert.end();
});

tap.test('asserting rejected promise with async/await', async assert => {
  const p = Promise.reject(new Error('rejected promise'));
  assert.rejects(p, new Error('rejected promise'));
  assert.end();
});

