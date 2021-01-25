'use strict';
import Joi from '@hapi/joi';

/*
  Example 1: Recursion
  + A simple tree type, with a value at each node, and left and right subtrees.
  + The type defines a toString method that recursively walks the tree and builds up
    a string from each node.
*/

class Tree {
  constructor(left, value, right) {
    this.left = left;
    this.value = value;
    this.right = right;
  }

  toString() {
    const leftStr = this.left ? this.left.toString() : '^';
    const rightStr = this.right ? this.right.toString() : '^';
    return `(${leftStr}-${this.value}-${rightStr})`;
  }
}

const oneLevelTree = new Tree(null, 1, null);
console.log(oneLevelTree.toString());

const twoLevelTree = new Tree(
  new Tree(null, 2, null),
  1,
  new Tree(null, 3, null)
);
console.log(twoLevelTree.toString());


const threeLevelTree = new Tree(
  new Tree(
    new Tree(null, 3, null),
    2,
    new Tree(null, 4, null)
  ),
  1,
  new Tree(
    new Tree(null, 6, null),
    5,
    new Tree(null, 7, null)
  ));

console.log(threeLevelTree.toString());


const tree = new Tree(
  new Tree(
    new Tree(null, 3, null), 2, new Tree(new Tree(null, 5, null), 4, null)),
  1,
  new Tree(
    new Tree(null, 7, null), 6, new Tree(null, 8, null)));

console.log(tree.toString());


/* Example 2: Declarative Programming

    For any given natural number > 0
    factorial(n) = 1, if n = 1
                   n * factorial(n - 1), if n > 1
*/
function factorial(n) {
  const schema = Joi.number().integer().min(1).required();
  const { error } = schema.validate(n);
  if (error) {
    console.log(`ERROR: ${ error }`);
    throw new Error(error);
  }

  return declarativeFunctional(n);

  function declarativeFunctional(n) {
    if (n == 1) {
      return 1;
    } else {
      return n * declarativeFunctional(n - 1);
    }
  }
}

console.log(`factorial(1) = ${ factorial(1) }`);
console.log(`factorial(2) = ${ factorial(2) }`);
console.log(`factorial(3) = ${ factorial(3) }`);

/* Example 3: Option type */

class Option {
  hasValue() { throw new Error('unimplemented'); }
  get() { throw new Error('unimplemented'); }
  getOrElse(alternative) {
    const schema = Joi.any().invalid(null).required();
    const { error } = schema.validate(alternative);
    if (error) {
      throw new Error(error);
    }
    return this.hasValue() ? this.get() : alternative;
  }
}

class Some extends Option {
  constructor(value) {
    super();
    this.value = value;
  }

  hasValue() {
    return true;
  }

  get() {
    return this.value;
  }

  toString() {
    return `Some(${ this.value })`;
  }
}

class None extends Option {
  hasValue() {
    return false;
  }

  get() {
    throw new Error('Option instance is empty');
  }

  toString() {
    return `None`;
  }
}

const names = [ new Some('Jason'), new None(), new Some('Idris') ];
console.log(`names[0].get() = ${ names[0].get() }`);
console.log(`names[1].getOrElse('unknown') = ${ names[1].getOrElse('unknown') }`);
console.log(`names[2].get() = ${ names[2].get() }`);

console.log(`names[0].hasValue() = ${ names[0].hasValue() }`);
console.log(`names[1].hasValue() = ${ names[1].hasValue() }`);
console.log(`names[2].hasValue() = ${ names[2].hasValue() }`);

function wrap(optionalValue) {
  return optionalValue ? new Some(optionalValue) : new None();
}

const optionals = [ wrap('Helen'), wrap(), wrap('Jennifer') ];
for (let option of optionals) {
  console.log(option.getOrElse('[None]'));
}

/* Example 4: add a list of numbers recursively
  First thing is declare the functionality:
  sum(a1) = a1
  sum(a1, a2, ..., aN) = a1 + sum(a2, ..., aN)
*/

function sum(num, ...nums) {
  const schema = Joi.array().items(Joi.number()).min(1).required();
  const { error } = schema.validate([num, ...nums]);
  if (error) {
    console.log(`Error: ${ error }`);
    throw new Error(error);
  }

  return declarativeSum(num, ...nums);

  function declarativeSum(num, ...nums) {
    if (nums.length) {
      const [firstNumFromRest, ...restNums] = nums;
      return num + declarativeSum(firstNumFromRest, ...restNums);
    } else {
      return num;
    }
  }
}

console.log(`sum(1) = ${ sum(1) }`);
console.log(`sum(1, 2) = ${ sum(1, 2) }`);
console.log(`sum(1, 2, 3) = ${ sum(1, 2, 3) }`);
console.log(`sum(1, 2, 3, 4) = ${ sum(1, 2, 3, 4) }`);
console.log(`sum(1, 2, 3, 4, 5) = ${ sum(1, 2, 3, 4, 5) }`);