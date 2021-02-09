import tap from 'tap';
import { createSequentialList } from '../src/lib/sequential-list.js';

tap.test('createSequentialList() should return an empty list', (assert) => {
  const seqList = createSequentialList();
  assert.ok(seqList);
  assert.strictEqual(seqList.length, 0);
  assert.true(seqList.isEmpty());
  assert.end();
});

tap.test('isEmpty() should return true if applied on empty list', (assert) => {
  const seqList = createSequentialList();
  seqList.insert('an element', 0);
  seqList.remove(0);

  assert.true(seqList.isEmpty());
  assert.end();
});

tap.test('isEmpty should return false if applied on non-empty list', (assert) => {
  const seqList = createSequentialList();
  seqList.insert('an element', 0);

  assert.false(seqList.isEmpty());
  assert.end();
});

tap.test('insert on empty list on invalid position should throw', (assert) => {
  const seqList = createSequentialList();

  assert.throws(() => {
    seqList.insert('an element', 1);
  });

  assert.throws(() => {
    seqList.insert('an element', -1);
  });
  assert.end();
});

tap.test('insert on non-empty list on invalid position should throw', (assert) => {
  const seqList = createSequentialList();
  seqList.insert('zero', 0);
  seqList.insert('one', 1);
  seqList.insert('two', 2);

  assert.throws(() => {
    seqList.insert('an element', -1);
  });

  assert.throws(() => {
    seqList.insert('an element', 4);
  });

  assert.end();
});

tap.test('insert on non-empty list on valid position should shift elements', (assert) => {
  const seqList = createSequentialList();
  seqList.insert('zero', 0);
  seqList.traverse((item) => {
    assert.equal(item, 'zero');
    return item;
  });
  assert.equal(seqList.length, 1);

  seqList.insert('one', 1);
  seqList.traverse((item, index) => {
    assert.equal(item, index == 0 ? 'zero': 'one');
    return item;
  });

  seqList.insert('minus one', 0);
  seqList.traverse((item, index) => {
    if (index === 0) {
      assert.equal(item, 'minus one');
    } else if (index === 1) {
      assert.equal(item, 'zero');
    } else if (index === 2) {
      assert.equal(item, 'one');
    } else {
      throw new Error('Unexpected situation');
    }
    return item;
  });

  seqList.insert('new zero', 1);
  seqList.traverse((item, index) => {
    if (index === 0) {
      assert.equal(item, 'minus one');
    } else if (index === 1) {
      assert.equal(item, 'new zero');
    } else if (index === 2) {
      assert.equal(item, 'zero');
    } else if (index === 3) {
      assert.equal(item, 'one');
    } else {
      throw new Error('Unexpected situation');
    }
    return item;
  });

  assert.end();
});
