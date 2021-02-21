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

  toString() {
    const repr = this.items.reduce((acc, item, index) => {
      const stackIndex = this.items.length - 1 - index;
      return acc + `\n${ stackIndex }: ${ this.items[index] }`;
    }, '');

    return repr;
  }
}
