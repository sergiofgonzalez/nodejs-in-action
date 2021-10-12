export const fibonacci = (): () => number => {
  let next = 0;
  let inc = 1;
  let current = 0;
  return (): number  => {
    [current, next, inc] = [next, inc, next + inc];
    return current;
  };
};

const fibonacciGetNext = fibonacci();

console.log(fibonacciGetNext()); // -> 0
console.log(fibonacciGetNext()); // -> 1
console.log(fibonacciGetNext()); // -> 1
console.log(fibonacciGetNext()); // -> 2
console.log(fibonacciGetNext()); // -> 3
console.log(fibonacciGetNext()); // -> 5
console.log(fibonacciGetNext()); // -> 8
console.log(fibonacciGetNext()); // -> 13
console.log(fibonacciGetNext()); // -> 21