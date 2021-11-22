# 07: Generics and Conditional Types &mdash; A generic memoize function
> a very detailed walkthrough on how to create a generic, type-safe `memoize()` function, in which type-safety is achieved through utility types (i.e. *mapped types*) such as `Record<K,V>`, `Parameters<T>`, and `ReturnType<T>`.

## Exercise 9.02

In this exercise, you'll create a `memoize()` function using generics so that:
+ It will work for any function shape, no matter the arguments or return type.
+ It will be completely type-safe

You'll start with a very naive definition of the function, and we will be introducing more type-safety and generic features. You will see how the syntax becomes very complex very quickly. Thus, I'll be elaborating in each of the steps.

1. Start by defining the first version of the `memoize()` function as follows:

```typescript
function memoize(fn: Function, keyGetter?: (args: any[]) => string) {
}
```

The function will accept the function to *memoize* as an argument, and optionally another function that will serialize the given function arguments, and that you will use as the key of the memoization cache.

The function will return a closure with the *memoization* logic *baked* into it. This will make a much more *generic* approach and provide a better DX.

Note that there are a few evident *code smells*: the function we received is declared as a `Function`, and they `keyGetter` is using `any`.

2. Implement the function with the current *naive* signature.
```typescript
function memoize(fn: Function, keyGetter?: (args: any[]) => string) {
  const cache: Record<string,any> = {};

  return (...args: any[]) => {
    const key = (keyGetter ?? JSON.stringify)(args);
    if (!(key in cache)) {
      cache[key] = fn(...args);
    }

    return cache[key];
  };
}
```

Note the use of the `Record<K,T>` type to support the cache. This *utility type* is part of the TypeScript core and it is used to model a key-value dictionary.

You can use it as follows:
```typescript
interface CatInfo {
  age: number;
  breed: string;
}

const cats: Record<string, CatInfo> = {
  'bengala': { age: 10, breed: 'Persian' },
  'lupita': { age: 5, breed: 'street cat' }
};
```

Apart from that, the implementation is quite straightforward:
+ get the cache key by serializing the received arguments (with either the provided serializer function or the `JSON.stringify()` function).
+ insert the result of executing the function in the cache, indexed by the computed key.
+ return the result from the cache.

3. Validate that the function works as expected by creating a *fabricated* expensive function. You can create a synchronous loop that iterates for a given number of seconds before returning a value as seen below. Then use your recently defined `memoize()` function to create a version of that expensive function and validate that it overrides the function execution when the value is found in the cache:

```typescript
function expensiveCalculation(a: number, b: number) {
  const timeout = 5_000;
  const start = Date.now();
  while (Date.now() <= start + timeout) {}

  return a + b;
}
expensiveCalculation(2, 3); // returns 5 after 5 secs

memoizedExpensiveCalculation = memoize(expensiveCalculation);
memoizedExpensiveCalculation(2, 3); // returns 5 after 5 secs
memoizedExpensiveCalculation(2, 3); // returns 5 immediately
```

4. With the pillars in place, validate that the approach is not very type-safe:

```typescript
expensiveCalculation('hello', 2); // ERR: string not assignable to number
const naiveMemoizedDefinition = memoize(expensiveCalculation);
console.log(naiveMemoizedDefinition('hello', 2)); // returns 'hello2'
```

While the original function requires numbers, the memoized version accepts all types of arguments, and we will just see that the function does not work as expected in runtime.

5. To make you `memoize()` function more type-safe you must start with a couple of helper functions that will help you getting rid of the `any` types:

```typescript
type AnyFunction = (...args: any[]) => any;
type KeyGetter<Fn extends AnyFunction> = (...args: Parameters<Fn> => string);
```

First you must define a type that describes a function that takes any number of arguments and returns anything: `AnyFunction`. We will use it to categorize some of the usages of `any`.

Then, we define a type for our key serialization function that we had declared as `(args: any[]) => string`. A much safer approach consists in annotate the function using generics and utility types. That way, we constrain the function as one that takes the parameters from the function we memoize.

Note the use of the `Parameters<T>` utility type:
The `Parameters<Type>` constructs a tuple type from the types used in the parameters of a function type.

For example:
```typescript
function f1(arg: { a: number, b: string }): void { ... }
type T0 = Parameters<typeof f1> // [arg: { a: number, b: string }]
```

As a result, `Parameters<Fn>` return the type that describes the parameters that `Fn` takes, which is exactly what we need.

6. With the help of those helper types, you can update the function definition to make it more type-safe:

```typescript
function memoize<Fn extends AnyFunction>(fn: Fn, keyGetter?: KeyGetter<Fn>) {
  ...
}
```

Note that we constrain `Fn` to be of type `AnyFunction`, to ensure that `memoize()` receives a function that takes any type of args and returns anything. We also use the utility type `KeyGetter` to annotate the function we receive to serialize the keys.

7. Now you can make the implementation more type-safe by changing the definition of the cache:

```typescript
const cache: Record<string, ReturnType<Fn>> = {};
```

Note the we use `ReturnType<Fn>` to type the values of the cache. This is a much safer approach than `any`, as it is constrained to the return type of the function that we use to call `memoize()`.

The utility type `ReturnType<Type>` constructs a type consisting of the return type of function `Type`:

```typescript
function f1(): { a: number, b: string } {...}
type T0 = ReturnType<typeof f1>; // T0 = { a: number, b: string }
```

This small step will make our code more type-safe as the cache will contain the exact type the function we send as an argument to `memoize` uses.

8. Finally, we should make more type-safe the function `memoize()` returns:

```typescript
return (...args: Parameters<Fn>) => { ... }
```

With this, we're making the function we return to receive the same arguments of the function we originally send to `memoize()`. As a result, we will now get a compilation error when we try to do:

```typescript
const memoizedExpensiveCalculation = memoize(expensiveCalculation);
memoizedExpensiveCalculation('hello', 2); // ERR: string not assignable to number
```