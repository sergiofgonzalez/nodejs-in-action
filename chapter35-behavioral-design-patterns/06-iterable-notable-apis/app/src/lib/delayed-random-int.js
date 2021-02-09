import Chance from 'chance';

export class DelayedRandomInt {
  constructor(count) {
    this.chance = new Chance();
    this.count = count ?? Infinity;
    this.currCount = 0;
  }

  [Symbol.iterator]() {
    return {
      next: () => {
        if (this.currCount < this.count) {
          const p = new Promise((resolve) => {
            setTimeout(() => {
              resolve(this.chance.integer());
            }, this.chance.integer({ min: 1000, max: 5000 }));
          });
          this.currCount++;
          return { value: p };
        } else {
          return { done: true };
        }
      }
    };
  }
}