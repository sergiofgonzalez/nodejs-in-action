import tap from 'tap';
import { createStack } from '../src/lib/stack.js';

/*
  isEmpty() {
    return this.items.length === 0;
  }

  push(item) {
    this.items.push(item);
  }

  pop() {
    if (this.items.length === 0) {
      throw new Error(`Cannot pop from an empty stack`);
    }
    return this.items.pop();
  }

  peek() {
    return this.items[this.items.length - 1];
  }
}

*/

/* createStack */
tap.test('createStack should return an empty stack', (assert) => {
  const stack = createStack();
  assert.ok(stack);
  assert.true(stack.isEmpty());
  assert.end();
});

/* isEmpty */
tap.test('isEmpty returns true for an empty list, false otherwise', assert => {
  const stack = createStack();
  assert.true(stack.isEmpty());

  stack.push(1);
  assert.false(stack.isEmpty());

  stack.pop();
  assert.true(stack.isEmpty());
  assert.end();
});

/* push/pop */
tap.test('push+pop returns the pushed element', assert => {
  const stack = createStack();
  stack.push('hello');
  const top = stack.pop();
  assert.equal(top, 'hello');
  assert.end();
});

/* pop */
tap.test('pop on empty list should throw', assert => {
  const stack = createStack();
  assert.throws(() => {
    stack.pop();
  });
  assert.end();
});

tap.test('pop keeps retrieving values in reverse order of insertion', assert => {
  const stack = createStack();
  stack.push(3);
  stack.push(2);
  stack.push(1);

  assert.true(stack.pop(), 1);
  assert.true(stack.pop(), 2);
  assert.true(stack.pop(), 3);
  assert.true(stack.isEmpty());

  assert.end();
});

/* peek */
tap.test('peek on empty list should throw', assert => {
  const stack = createStack();
  assert.throws(() => {
    stack.peek();
  });

  assert.end();
});

tap.test('peek returns top of the stack without removing it', assert => {
  const stack = createStack();
  stack.push('hello');
  assert.true(stack.peek(), 'hello');
  assert.true(stack.peek(), 'hello');

  assert.end();
});
