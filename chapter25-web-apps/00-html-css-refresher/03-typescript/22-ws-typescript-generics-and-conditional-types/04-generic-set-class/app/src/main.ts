class MySet<T> {
  #items: T[];

  constructor(initialItems: T[] = []) {
    this.#items = initialItems;
  }

  get size(): number {
    return this.#items.length;
  }

  has(item: T): boolean {
    return this.#items.includes(item);
  }

  add(item: T): void {
    if (!this.has(item)) {
      this.#items.push(item);
    }
  }

  remove(item: T): void {
    const itemIndex = this.#items.indexOf(item);
    if (itemIndex >= 0) {
      this.#items.splice(itemIndex, 1);
    }
  }
}

const set = new MySet<number>([1, 2, 3]);
console.log(`size:`, set.size);
set.add(1);
console.log(`size:`, set.size);

console.log('has 1?', set.has(1));
console.log('has 4?', set.has(4));

set.remove(1);
console.log(`size:`, set.size);
console.log('has 1?', set.has(1));
