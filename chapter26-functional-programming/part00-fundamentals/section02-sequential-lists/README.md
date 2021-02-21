# Chapter 26 &mdash; Functional Programming
## [Part 0: Fundamentals](../part00-fundamentals/)
### Section 02: Lists: sequential representation

#### Contents
+ The **List** ADT
+ The **Stack** ADT
+ The **Queue** ADT

#### Intro

This section will delve into the definition and operations of three of the most common *abstract data types (ADTs)*: the **List**, the **Stack** and the **Queue**.

In this section we'll also implement the operation using the simplest possible implementation: their sequential representation.

#### The *List* ADT

> A **List** is a collection of elements of the same type and arranged in order.

As a **list** is ordered, all the elements (except for the first one), will have a *previous* one, and all the elements (except for the last one), will have a *next* one.

Also, each of the elements will have a position assigned. This position does not necessarily have to do with its value, but rather by its relative position with the rest of the elements.

The *regular* **List** should support the following operations:
+ `createList(...)` &mdash; initializes and returns an empty list
+ `isEmpty()` &mdash; returns `true` if the list is empty, `false` otherwise.
+ `insert(item, pos)` &mdash; inserts the given item in the list, in the position `pos` given. Therefore, `pos` should be in the range `[0, length]`. After inserting the item, the list length should have increased, and the elements in position from `pos + 1` to the end of the list should have been shifted *right* one position.
+ `remove(pos)` &mdash; the element at the given position `pos` is removed from the list. Elements from `pos + 1` until the end of the list should have been shifted *left* one position.
+ `length` &mdash; returns the number of elements of the list
+ `forEach(operationFn)` &mdash; traverses the list in order applying the given operation to each of the elements.

| NOTE: |
| :------- |
| The **List** described in the section above is a mutable one. Typically, you should prefer immutable data types. |

##### Implementing the *List* operations

We can rely as much as possible on JavaScript arrays to provide the implementation for the sequential list.

First of all, we need to provide the implementation for the *factory* function:

```javascript
export function createSequentialList() {
  return new SequentialList();
}

class SequentialList {
  constructor() {
    this.items = [];
  }
  ...
```

We will therefore instantiate the `SequentialList` class, hidden the implementation of the class behind the factory function `createSequentialList()`. The backing implementation for the sequential list is a JavaScript array.

Next is the `isEmpty()` function. This becomes a very simple implementation (O(1)) if we rely on the `length` property of the backing array.

```javascript
isEmpty() {
  return this.items.length === 0;
}
```

After that, we implement the `insert(...)` operation. Again, it becomes very simple if we rely on the `splice()` method that let us add a certain element *in place*.

```javascript
insert({ item, pos }) {
  if (pos < 0 || pos > this.items.length) {
    throw new RangeError(`pos ${ pos } is out of bounds for inserting`);
  }
  this.items.splice(pos, 0, item);
}
```

Similarly, the `remove()` method is also implemented using `splice()`, but this time it removes the element in the given position.

```javascript
remove(pos) {
  if (pos < 0 || pos >= this.items.length) {
    throw new RangeError(`pos ${ pos } is out of bounds for removing`);
  }
  this.items.splice(pos, 1);
}
```

The `length` method is implemented as a getter that returns the length of the backing array:

```javascript
get length() {
  return this.items.length;
}
```

Finally, the `traverse()` method that let us apply a function to each of the elements of the array *in-place*:

```javascript
traverse(operationFn) {
  for (let i = 0; i < this.items.length; i++) {
    this.items[i] = operationFn({ item: this.items[i], index: i });
  }
}
```
| EXAMPLE: |
| :------- |
| See [01 &mdash; **List**: Implementing a mutable, sequential list](01-list-sequential-mutable) for a runnable example. |

#### The *Stack* ADT

> A *Stack* is a sorted collection of elements. The order of the elements is given by the order in which they were inserted. The element that was pushed more recently is known as the *top* of the stack. The insertion and removal of elements into a *stack* is always done from the *top* of the stack, so this structure is known as *LIFO (last-in, first out)*.

A *Stack* support the following methods:

+ `createStack()` &mdash; initializes and returns a new stack
+ `isEmpty()` &mdash; returns true if the stack holds no elements, false otherwise
+ `push(elem)` &mdash; inserts the given element at the top of the stack
+ `pop(elem)` &mdash; removes and returns the element at the top of the stack
+ `peek()` &mdash; returns the element at the top of the stack without removing it

##### Implementing the *Stack* operations

The implementation of list operations backed by a JavaScript array are immediate:

```javascript
export function createStack() {
  return new Stack();
}


class Stack {
  constructor() {
    this.items = [];
  }

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
    if (this.items.length === 0) {
      throw new Error(`Cannot peek on empty stack`);
    }
    return this.items[this.items.length - 1];
  }
}
```

The only interesting addition is the guards we added on `pop()` and `peek()` to throw exceptions when we try to remove or view the element at the top of the stack on empty lists.

| EXAMPLE: |
| :------- |
| See [02 &mdash; **Stack**](02-stack) for a runnable example. |

##### Application: A stack-based calculator

In this section we will see how we can implement a stack-based calculator that is able to evaluate expressions such as `3 6 2 - +`.

In order to implement it, it is enough to push numbers in the stack, and when receiving an operation pop the elements and push the result back to the stack.

It can be implemented as follows:

```javascript
import { createStack } from './stack.js';

export class CalcStack {
  constructor() {
    this.stack = createStack();
  }

  enter(input) {
    const num = Number(input);
    this.stack.push(!isNaN(num) ? num : input);
  }

  add() {
    try {
      const { op1, op2 } = this.getOperandsForBinaryOperation();
      this.stack.push(op1 + op2);
    } catch (err) {
      console.log(`>ERROR< ${ err.message }`);
    }
  }

  sub() {
    try {
      const { op1, op2 } = this.getOperandsForBinaryOperation();
      this.stack.push(op1 + op2);
    } catch (err) {
      console.log(`>ERROR< ${ err.message }`);
    }
  }

  mult() {
    try {
      const { op1, op2 } = this.getOperandsForBinaryOperation();
      this.stack.push(op1 * op2);
    } catch (err) {
      console.log(`>ERROR< ${ err.message }`);
    }
  }

  div() {
    try {
      const { op1, op2 } = this.getOperandsForBinaryOperation();
      this.stack.push(op1 / op2);
    } catch (err) {
      console.log(`>ERROR< ${ err.message }`);
    }
  }

  neg() {
    try {
      const op1 = this.getOperandForUnaryOperation();
      this.stack.push(-op1);
    } catch (err) {
      console.log(`>ERROR< ${ err.message }`);
    }
  }

  sqrt() {
    try {
      const op1 = this.getOperandForUnaryOperation();
      this.stack.push(Math.sqrt(op1));
    } catch (err) {
      console.log(`>ERROR< ${ err.message }`);
    }
  }

  pow() {
    try {
      const { op1, op2 } = this.getOperandsForBinaryOperation();
      this.stack.push(op1 ** op2);
    } catch (err) {
      console.log(`>ERROR< ${ err.message }`);
    }
  }

  mod() {
    try {
      const { op1, op2 } = this.getOperandsForBinaryOperation();
      this.stack.push(op1 % op2);
    } catch (err) {
      console.log(`>ERROR< ${ err.message }`);
    }
  }

  swap() {
    try {
      const { op1, op2 } = this.getOperandsForBinaryOperation();
      this.stack.push(op2);
      this.stack.push(op1);
    } catch (err) {
      console.log(`>ERROR< ${ err.message }`);
    }
  }

  getOperandsForBinaryOperation() {
    let op1, op2;
    if (this.stack.isEmpty()) {
      throw new Error(`not enough arguments`);
    } else {
      op2 = this.stack.pop();
    }

    if (this.stack.isEmpty()) {
      this.stack.push(op2);
      throw new Error(`not enough arguments`);
    } else {
      op1 = this.stack.pop();
    }
    return { op1, op2 };
  }

  getOperandForUnaryOperation() {
    let op1;
    if (this.stack.isEmpty()) {
      throw new Error(`not enough arguments`);
    } else {
      op1 = this.stack.pop();
    }

    return op1;
  }

  toString() {
    return this.stack.toString();
  }

}
```

The stack based calculator is implemented as a class so that consumer code can extend the functionality as needed.

In the constructor, we create the backing *stack* that will be used to keep the operands. Then, we define a set of methods for all the operations we support. In order to centralize error handling we define a couple of support methods for retrieving the operands for binary and unary operations.

| EXAMPLE: |
| :------- |
| See [03 &mdash; **Stack** application: A stack-based calculator](03-calc-based-stack) for a runnable example. |

#### Code, Exercises and mini-projects

##### [01 &mdash; **List**: Implementing a mutable, sequential list](01-list-sequential-mutable)
Illustrates how to implement a *mutable* list using a sequential representation backed by a JavaScript array.

##### [02 &mdash; **Stack**](02-stack)
Illustrates how to implement a *stack* backed by a JavaScript array.

##### [03 &mdash; **Stack** application: A stack-based calculator](03-calc-based-stack)
Illustrates how to implement a *stack*-based calculator.

##### Exercise 1: [Getting the binary representation of a number](e01-stack-binary-number)
Write a program that takes as an input a number in base 10 and returns  its representation in base 2.
Hint: you can find the binary representation of any given number in base 10 by repeatedly dividing it by 2 until the divisor is zero. The remainders of all those divisions will give you the binary number.

##### Exercise 2: [Solving the labyrinth](e02-stack-labyrinth)
Given a labyrinth represented by an NxN matrix, write a program that finds a way from a given input cell, to a given exit cell if there's a way or otherwise prints `'No possible way to the exit'`. Movements in the matrix should be according to the North, East, South, West directions, so that diagonal movements are not permitted.