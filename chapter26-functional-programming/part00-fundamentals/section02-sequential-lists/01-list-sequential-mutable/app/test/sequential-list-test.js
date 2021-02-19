import tap from 'tap';
import { createSequentialList } from '../src/lib/sequential-list.js';

/* create */
tap.test('createSequentialList() should return an empty list', (assert) => {
  const seqList = createSequentialList();
  assert.ok(seqList);
  assert.strictEqual(seqList.length, 0);
  assert.true(seqList.isEmpty());
  assert.end();
});

/* isEmpty() */
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

/* insert */
tap.test('insert on empty list on invalid position should throw', (assert) => {
  const seqList = createSequentialList();

  assert.throws(() => {
    seqList.insert({item: 'an element', pos: 1});
  });

  assert.throws(() => {
    seqList.insert({item: 'an element', pos: -1});
  });
  assert.end();
});

tap.test('insert on non-empty list on invalid position should throw', (assert) => {
  const seqList = createSequentialList();
  seqList.insert({item: 'zero', pos: 0});
  seqList.insert({item: 'one', pos: 1});
  seqList.insert({item: 'two', pos: 2});

  assert.throws(() => {
    seqList.insert({item: 'an element', pos: -1});
  });

  assert.throws(() => {
    seqList.insert({item: 'an element', pos: 4});
  });

  assert.end();
});

tap.test('insert on non-empty list on valid position should shift elements', (assert) => {
  const seqList = createSequentialList();
  seqList.insert({item: 'zero', pos: 0});
  seqList.traverse(({ item }) => {
    assert.equal(item, 'zero');
    return item;
  });
  assert.equal(seqList.length, 1);

  seqList.insert({item: 'one', pos: 1});
  seqList.traverse(({ item, index }) => {
    assert.equal(item, index == 0 ? 'zero': 'one');
    return item;
  });

  seqList.insert({item: 'minus one', pos: 0});
  seqList.traverse(({item, index}) => {
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

  seqList.insert({item: 'new zero', pos: 1});
  seqList.traverse(({item, index}) => {
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

/* remove */
tap.test('remove on empty list should fail', assert => {
  const seqList = createSequentialList();
  assert.throws(() => {
    seqList.remove(0);
  });

  assert.throws(() => {
    seqList.remove(1);
  });

  assert.throws(() => {
    seqList.remove(-1);
  });

  assert.end();
});


tap.test('remove on non-empty list, out of lower bounds should fail', assert => {
  const seqList = createSequentialList();
  seqList.insert(0, 'one element');
  assert.throws(() => {
    seqList.remove(-1);
  });

  assert.end();
});


tap.test('remove on non-empty list, out of upper bounds should fail', assert => {
  const seqList = createSequentialList();
  seqList.insert(0, 'one element');
  assert.throws(() => {
    seqList.remove(1);
  });

  assert.end();
});


tap.test('remove first element should shift all elements one pos', assert => {
  const seqList = createSequentialList();
  seqList.insert({item: 'zero', pos: 0});
  seqList.insert({item: 'one', pos: 1});
  seqList.insert({item: 'two', pos: 2});

  seqList.remove(0);

  seqList.traverse(({item, index}) => {
    if (index === 0) {
      assert.equal(item, 'one');
    } else if (index === 1) {
      assert.equal(item, 'two');
    } else {
      throw new Error('Unexpected state');
    }
  });

  assert.end();
});

tap.test('remove elem in the middle should leave head part unchanged, trail shifted', assert => {
  const seqList = createSequentialList();
  seqList.insert({item: 'zero', pos: 0});
  seqList.insert({item: 'one', pos: 1});
  seqList.insert({item: 'two', pos: 2});

  seqList.remove(1);

  seqList.traverse(({item, index}) => {
    if (index === 0) {
      assert.equal(item, 'zero');
    } else if (index === 1) {
      assert.equal(item, 'two');
    } else {
      throw new Error('Unexpected state');
    }
  });

  assert.end();
});

tap.test('remove last element should leave head part unchanged', assert => {
  const seqList = createSequentialList();
  seqList.insert({item: 'zero', pos: 0});
  seqList.insert({item: 'one', pos: 1});
  seqList.insert({item: 'two', pos: 2});

  seqList.remove(2);

  seqList.traverse(({item, index}) => {
    if (index === 0) {
      assert.equal(item, 'zero');
    } else if (index === 1) {
      assert.equal(item, 'one');
    } else {
      throw new Error('Unexpected state');
    }
  });

  assert.end();
});

/* length */
tap.test(`length of empty list is zero`, assert => {
  const seqList = createSequentialList();
  assert.equal(seqList.length, 0);
  assert.end();
});

tap.test(`length of non-empty list is the number of elements`, assert => {
  const seqList = createSequentialList();

  seqList.insert({item: 'zero', pos: 0});
  assert.equal(seqList.length, 1);

  seqList.insert({item: 'one', pos: 1});
  assert.equal(seqList.length, 2);

  seqList.insert({item: 'two', pos: 2});
  assert.equal(seqList.length, 3);

  assert.end();
});

/* traverse */
tap.test(`traverse empty list is a no-op`, assert => {
  const seqList = createSequentialList();
  assert.doesNotThrow(() => {
    seqList.traverse(({item}) => item);
  });

  assert.end();
});


tap.test(`traverse non-empty list mutates the list applying the given function to each elem`, assert => {
  const seqList = createSequentialList();
  seqList.insert({item: 5, pos: 0});
  seqList.insert({item: 6, pos: 1});
  seqList.insert({item: 7, pos: 2});

  seqList.traverse(({item, index}) => item * index);

  seqList.traverse(({item, index}) => {
    if (index === 0) {
      assert.equal(item, 0);
    } else if (index === 1) {
      assert.equal(item, 6);
    } else if (index === 2) {
      assert.equal(item, 14);
    } else {
      throw new Error('Unsupported operation exception');
    }
  });

  assert.end();
});
