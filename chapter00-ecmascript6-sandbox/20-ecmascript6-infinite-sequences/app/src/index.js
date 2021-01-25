"use strict";

const util = require("util");
util.inspect.defaultOptions.depth = null;

const random = {
  [Symbol.iterator]: () => ({
    next: () => ({
      value: Math.random()
    }),
    done: false
  })
};

const [firstRandomNum, secondRandomNum] = random;

console.log(`A couple of random numbers: ${ firstRandomNum }, ${ secondRandomNum }`);

/*
  Pulling an indefinite number of elements
  from the infinite sequence has to be done
  very carefully to prevent an infinite loop
  Array.from() and [...random ] will automatically
  crash the program
*/
for (let value of random) {
  if (value > 0.8) {
    console.log(`end condition met: ${ value } > .8`);
    break;
  }
  console.log(`keeping trying: ${ value }`);
}

/* you can encapsulate this in a more elegant way with a function */
function take(sequence, amount) {
  return {
    [Symbol.iterator]() {
      const iterator = sequence[Symbol.iterator]();
      return {
        next() {
          if (amount-- < 1) {
            return {
              done: true
            };
          }
          return iterator.next();
        }
      };
    }
  };
}

const tenRandomNums = [...take(random, 10)];
tenRandomNums.forEach((randomNum, i) => console.log(`${ i+ 1 }: ${ randomNum }`));

const threeRandomNums = Array.from(take(random, 3));
console.log(`Three random nums=${ threeRandomNums }`);

/* You can also encapsulate by other conditions */
function range(sequence, low = 0, high = 1) {
  return {
    [Symbol.iterator]() {
      const iterator = sequence[Symbol.iterator]();
      return {
        next() {
          const item = iterator.next();
          if (item.value < low || item.value > high) {
            return { done: true };
          }
          return item;
        }
      };
    }
  };
}

const randValuesInRange = [...range(random, 0.125, 0.855)];
console.log(`randValuesInRange=${ randValuesInRange }`);