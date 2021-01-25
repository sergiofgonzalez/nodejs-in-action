const counterSymbol = Symbol('counter');
const actionSymbol = Symbol('action');

export class Countdown {
  constructor(counter, action) {
    this[counterSymbol] = counter;
    this[actionSymbol] = action;
  }

  dec() {
    if (this[counterSymbol] < 1) {
      return;
    }
    this[counterSymbol]--;
    if (this[counterSymbol] === 0) {
      this[actionSymbol]();
    }
  }

  get counter() {
    return this[counterSymbol];
  }
}