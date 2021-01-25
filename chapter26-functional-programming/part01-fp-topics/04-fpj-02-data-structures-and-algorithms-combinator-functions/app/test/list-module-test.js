const tap = require('tap');
const { emptyList, list, EMPTY_LIST } = require('../src/lib/list-module.js');


tap.test('Calling head on empty list should throw', assert => {
  assert.throws(() => emptyList().head(), 'head() throws when called on empty list');
  assert.end();
});

tap.test('Calling tail on empty list should throw', assert => {
  assert.throws(() => emptyList().tail(), 'head() throws when called on empty list');
  assert.end();
});

tap.test('Calling tail on a list with multiple elements returns a non-empty list', assert => {
  const aList = list('one', list('two', emptyList()));
  const tail = aList.tail();
  assert.true(tail.equals(list('two', emptyList())));
  assert.end();
});

tap.test('Calling head on a non-empty list returns the head', assert => {
  const headStr = list('one', EMPTY_LIST).head();
  assert.equals(headStr, 'one', 'head must match');
  assert.end();
});

tap.test('All empty lists are equal', assert => {
  const anEmptyList = EMPTY_LIST;
  const anotherEmptyList = emptyList();
  assert.equals(anEmptyList, EMPTY_LIST);
  assert.equals(anotherEmptyList,EMPTY_LIST);
  assert.equals(anEmptyList, anotherEmptyList);
  assert.end();
});

tap.test('Lists are recursive structures', assert => {
  const list1 = list('one', list('two', list('three', EMPTY_LIST)));
  assert.equals(list1.toString(), `(one, (two, (three, ())))`);
  assert.end();
});

/* additional tests */
tap.test('When building a list, tail must be a list', assert => {
  assert.throws(() => list('one', 'two'), 'tail must be a list');
  assert.end();
});

tap.test('An empty list is empty', assert => {
  const anEmptyList = emptyList();
  assert.true(anEmptyList.isEmpty(), 'an empty list must be empty');
  assert.true(EMPTY_LIST.isEmpty(), 'EMPTY_LIST must be empty');
  assert.end();
});

tap.test('A list with elements is not empty', assert => {
  const nonEmptyList1 = list('one', emptyList());
  const nonEmptyList2 = list('one', list('two', EMPTY_LIST));

  assert.false(nonEmptyList1.isEmpty(), 'non empty list with one element should not be empty');
  assert.false(nonEmptyList2.isEmpty(), 'non empty list with several elements should not be empty');
  assert.end();
});

tap.test('Two lists with one element, with head being the same, should be equal', assert => {
  const list1 = list('one', EMPTY_LIST);
  const list2 = list('one', EMPTY_LIST);
  assert.true(list1.equals(list2), 'should be equal');
  assert.end();
});

tap.test('Two lists with several elements, with head being the same, tail being the same should be equal', assert => {
  const list1 = list('one', list('two', list('three', EMPTY_LIST)));
  const list2 = list('one', list('two', list('three', EMPTY_LIST)));
  assert.true(list1.equals(list2), 'should be equal');
  assert.end();
});

tap.test('Two lists with one element, with head being different, should not be equal', assert => {
  const list1 = list('one', EMPTY_LIST);
  const list2 = list('two', EMPTY_LIST);
  assert.false(list1.equals(list2), 'should not be equal');
  assert.end();
});

tap.test('Two lists with several elements, with head being the same, tail being different should not, be equal', assert => {
  const list1 = list('one', list('two', list('three', EMPTY_LIST)));
  const list2 = list('one', list('two', list('3', EMPTY_LIST)));
  assert.false(list1.equals(list2), 'should be equal');
  assert.end();
});

tap.test('A non-empty list and an empty list are not equal', assert => {
  const list1 = list('one', EMPTY_LIST);
  assert.false(list1.equals(EMPTY_LIST), 'should be different');
  assert.false(EMPTY_LIST.equals(list1), 'should be different too');
  assert.end();
});

/* what about comple elements in the list? */
tap.test('Arrays as elements', assert => {
  const list1 = list(['one', 'two', 'three'], EMPTY_LIST);
  const list2 = list(['one', 'two', 'three'], EMPTY_LIST);
  assert.true(list1.equals(list2), 'should be equal');
  assert.true(list2.equals(list1), 'should be equal');
  assert.end();
});

tap.test('Arrays as elements', assert => {
  const list1 = list(['one', 'two', 'three'], list(['four', 'five'], EMPTY_LIST));
  const list2 = list(['one', 'two', 'three'], list(['four', 'five'], EMPTY_LIST));
  assert.true(list1.equals(list2), 'should be equal');
  assert.true(list2.equals(list1), 'should be equal');
  assert.end();
});

tap.test('Objects as elements', assert => {
  const list1 = list({ name: 'foo', age: 45 }, EMPTY_LIST);
  const list2 = list({ name: 'foo', age: 45 }, EMPTY_LIST);
  assert.true(list1.equals(list2), 'should be equal');
  assert.true(list2.equals(list1), 'should be equal');
  assert.end();
});

tap.test('Objects as elements', assert => {
  const list1 = list({ name: 'foo', age: 45 }, list({ foo: 'bar' }, EMPTY_LIST));
  const list2 = list({ name: 'foo', age: 45 }, list({ foo: 'bar' }, EMPTY_LIST));
  assert.true(list1.equals(list2), 'should be equal');
  assert.true(list2.equals(list1), 'should be equal');
  assert.end();
});

tap.test('Arrays as elements not equal', assert => {
  const list1 = list(['one', 'two', 'three'], EMPTY_LIST);
  const list2 = list(['one', '2', 'three'], EMPTY_LIST);
  assert.false(list1.equals(list2), 'should not be equal');
  assert.false(list2.equals(list1), 'should not be equal');
  assert.end();
});

tap.test('Arrays as elements not equal', assert => {
  const list1 = list(['one', 'two', 'three'], list(['four', 'five'], EMPTY_LIST));
  const list2 = list(['one', 'two', 'three'], list(['four', '5'], EMPTY_LIST));
  assert.false(list1.equals(list2), 'should not be equal');
  assert.false(list2.equals(list1), 'should not be equal');
  assert.end();
});


tap.test('Objects as elements not equal', assert => {
  const list1 = list({ name: 'foo', age: 45 }, EMPTY_LIST);
  const list2 = list({ name: 'foo', age: 46 }, EMPTY_LIST);
  assert.false(list1.equals(list2), 'should not be equal');
  assert.false(list2.equals(list1), 'should not be equal');
  assert.end();
});


tap.test('Objects as elements not equal', assert => {
  const list1 = list({ name: 'foo', age: 45 }, list({ foo: 'bar' }, EMPTY_LIST));
  const list2 = list({ name: 'foo', age: 45 }, list({ foo: 'car' }, EMPTY_LIST));
  assert.false(list1.equals(list2), 'should not be equal');
  assert.false(list2.equals(list1), 'should not be equal');
  assert.end();
});

/* Combinator functions */

tap.test('filter fails if not passing a function as argument', assert => {
  assert.throws(() => EMPTY_LIST.filter(), 'filter throws when not passing anything on empty list');
  assert.throws(() => list('one', EMPTY_LIST).filter(), 'filter throws when not passing anything on non-empty list');
  assert.throws(() => EMPTY_LIST.filter(true), 'filter throws when not passing a function on empty list');
  assert.throws(() => list('one', EMPTY_LIST).filter(2.22), 'filter throws when not passing a function on non-empty list');
  assert.end();
});

tap.test('filter returns a clone of the collection when predicate returns true', assert => {
  assert.true(EMPTY_LIST.filter(() => true).equals(EMPTY_LIST), 'should be equal');
  assert.true(EMPTY_LIST.filter(() => false).equals(EMPTY_LIST), 'should be equal');

  const list1 = list(1, list(2, list(3, EMPTY_LIST)));
  assert.true(list1.filter(() => true).equals(list1));

  assert.end();
});

tap.test('map returns a list on which the given function is applied to every element', assert => {
  assert.true(EMPTY_LIST.map(() => 0).equals(EMPTY_LIST));
  assert.true(EMPTY_LIST.map(item => item).equals(EMPTY_LIST));

  const list1 = list(1, list(2, list(3, EMPTY_LIST)));
  assert.true(list1.map(item => item * -1).equals(list(-1, list(-2, list(-3, EMPTY_LIST)))));
  assert.end();
});

tap.test('foldLeft returns a single item consisting on applying the function in the list from left to right', assert => {
  assert.equals(EMPTY_LIST.foldLeft(0, (seed, item) => seed * item), 0);
  assert.equals(EMPTY_LIST.foldLeft(123, (seed, item) => seed * item), 123);

  const list1 = list(1, list(2, list(3, list(4, emptyList()))));
  assert.equals(list1.foldLeft(0, (seed, item) => seed + item), 10);

  assert.end();
});

tap.test('foldRight returns a single item consisting on applying the function in the list from right to left', assert => {
  assert.equals(EMPTY_LIST.foldRight(0, (seed, item) => seed * item), 0);
  assert.equals(EMPTY_LIST.foldRight(123, (seed, item) => seed * item), 123);

  const list1 = list(1, list(2, list(3, list(4, emptyList()))));
  assert.equals(list1.foldRight(0, (item, seed) => item + seed), 10);

  assert.end();
});

tap.test('foreach applies the given function to all the elements', assert => {
  const list1 = list(1, list(2, list(3, list(4, emptyList()))));
  const result = [];
  list1.foreach(item => result.push(`one item is ${ item }`));

  assert.deepEquals(result, ['one item is 1', 'one item is 2', 'one item is 3', 'one item is 4']);

  assert.end();
});