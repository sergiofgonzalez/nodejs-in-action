class Box<T> {
  #value: T;

  constructor(value: T) {
    this.#value = value;
  }

  get value(): T {
    return this.#value;
  }

  map<U>(mapper: (value: T) => U): U {
    return mapper(this.#value);
  }
}

const box = new Box<string>('Jason Isaacs');
console.log(box.value);

const length = box.map((value) => value.length);
console.log(length);
