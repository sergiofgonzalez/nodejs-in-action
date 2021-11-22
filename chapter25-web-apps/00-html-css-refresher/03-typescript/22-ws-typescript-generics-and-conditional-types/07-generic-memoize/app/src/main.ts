import { time } from 'console';



// eslint-disable-next-line @typescript-eslint/no-explicit-any
type AnyFunction = (...args: any[]) => any;
type KeyGetter<Fn extends AnyFunction> = (...args: Parameters<Fn>) => string;

/**
 * optimizes the performance of a function but caching the result of
 * execution of a function
 * @param fn function to memoize
 * @param keyGetter serializes the arguments to a string key
 */
function memoize_v1<Fn extends AnyFunction>(fn: Fn, keyGetter?: KeyGetter<Fn>) {
  const cache: Record<string, ReturnType<Fn>> = {};

  return (...args: Parameters<Fn>) => {
    const key = (keyGetter ?? JSON.stringify)(args);
    if (!(key in cache)) {
      cache[key] = fn(...args);
    }

    return cache[key];
  };
}

// eslint-disable-next-line @typescript-eslint/ban-types, @typescript-eslint/no-explicit-any
function memoize_v0(fn: Function, keyGetter?: (args: any[]) => string) {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const cache: Record<string, any> = {};

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return (...args: any[]) => {
    const key = (keyGetter ?? JSON.stringify)(args);
    if (!(key in cache)) {
      cache[key] = fn(...args);
    }

    return cache[key];
  };
}

function expensiveCalculation(a: number, b: number) {
  const timeout = 5_000;
  const start = Date.now();
  while (Date.now() <= start + timeout) {}

  return a + b;
}

/* functionality checks */
console.log(`=== no memoization`);
console.log(`expensiveCalculation(2, 3):`);
console.log(` =>`, expensiveCalculation(2, 3));
console.log(`expensiveCalculation(2, 3):`);
console.log(` =>`, expensiveCalculation(2, 3));

console.log(`\n=== with memoization`);
const memoizedExpensiveCalculation = memoize_v1(expensiveCalculation);
console.log(`expensiveCalculation(2, 3):`);
console.log(` =>`, memoizedExpensiveCalculation(2, 3));
console.log(`expensiveCalculation(2, 3):`);
console.log(` =>`, memoizedExpensiveCalculation(2, 3));

/* Type-safety checks */
// expensiveCalculation('hello', 2); // ERR: string not assignable to number
const naiveMemoizedDefinition = memoize_v0(expensiveCalculation);
console.log(naiveMemoizedDefinition('hello', 2)); // returns 'hello2'
// memoizedExpensiveCalculation('hello', 2); // ERR: string not assignable to number