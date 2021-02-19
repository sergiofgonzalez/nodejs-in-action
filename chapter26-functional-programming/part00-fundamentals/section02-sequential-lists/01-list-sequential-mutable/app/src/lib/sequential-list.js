export function createSequentialList() {
  return new SequentialList();
}


class SequentialList {
  constructor() {
    this.items = [];
  }

  isEmpty() {
    return this.items.length === 0;
  }

  insert({ item, pos }) {
    if (pos < 0 || pos > this.items.length) {
      throw new RangeError(`pos ${ pos } is out of bounds for inserting`);
    }
    this.items.splice(pos, 0, item);
  }

  remove(pos) {
    if (pos < 0 || pos >= this.items.length) {
      throw new RangeError(`pos ${ pos } is out of bounds for removing`);
    }
    this.items.splice(pos, 1);
  }

  get length() {
    return this.items.length;
  }

  traverse(operationFn) {
    for (let i = 0; i < this.items.length; i++) {
      this.items[i] = operationFn({ item: this.items[i], index: i });
    }
  }
}
