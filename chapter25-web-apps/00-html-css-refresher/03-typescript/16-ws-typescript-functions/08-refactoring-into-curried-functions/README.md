# 08: TypeScript functions &mdash; Refactoring into curried functions
> illustrates how to refactor functions with multiple arguments into curried functions and its benefits.

## Exercise 3.06

This exercise takes the solution of
[06: Factory pattern using closures](../06-factory-pattern-using-closures) as the starting point, and refactors it into curried functions.

First we examine the starting point code:

```typescript
export const orderFactory = (): (color: string, size: string, quantity: number) => Order[] => {
  let id = 0;
  const createOrder = (color: string, size: string, quantity: number): Order[] => {
    const orders = [];
    for (let i = 0; i < quantity; i++) {
      orders.push({ id: id++, color, size });
    }
    return orders;
  };
  return createOrder;
};
```

The `orderFactory` variable holds a reference to a function that takes no arguments, and returns a function that takes 3 arguments and returns an array of Orders: `(color: string, size: string, quantity: number) => Order[]`.

The function is then used as follows:

```typescript
const createOrder = orderFactory();
const orderOne = createOrder('red', 'M', 4);
```

Thus, the function returned by `orderFactory()` is candidate to being refactored into a curried function.

In our first attempt, we can refactor using the following accesible, less concise syntax:

```typescript
export const orderFactory = () => {
  let id = 0;
  return (color: string) => {
    return (size: string) => {
      return (quantity: number): Order[] => {
        const orders = [];
        for (let i = 0; i < quantity; i++) {
          orders.push({ id: id++, color, size });
        }
        return orders;
      };
    };
  };
};
```

Note how now the `orderFactory` returns a function that returns a function, that returns a function, that returns a function, that returns an array of `Order` instances.

The function can now be invoked with multiple argument lists:

```typescript
const createOrder = orderFactory();
const orderOne = createOrder('red')('M')(4);
```

In the next step, we can try to make the **curried function** syntax more concise. This can be easily done removing the curly braces and return keyword for functions with a single line.

Remember that
```typescript
const fn = (x: string) => {
  return `hello, Mr. ${ x }!`
};
```

is the same as:
```typescript
const fn = (x: string) => `hello, Mr. ${ x }!`;
```

Applying above's technique we have:
```typescript
export const orderFactory = () => {
  let id = 0;
  return (color: string) =>
    (size: string) =>
      (quantity: number): Order[] => {
        const orders = [];
        for (let i = 0; i < quantity; i++) {
          orders.push({ id: id++, color, size });
        }
        return orders;

  };
};
```

And we can do a little bit of formatting to reach our final version:

```typescript
export const orderFactory = () => {
  let id = 0;
  return (color: string) => (size: string) => (quantity: number): Order[] => {
        const orders = [];
        for (let i = 0; i < quantity; i++) {
          orders.push({ id: id++, color, size });
        }
        return orders;
  };
};
```

Note that we have omitted some of the type annotations in the function, as TypeScript can infer those types for us. Otherwise, the *curried function** will look much uglier.

The added benefit of this refactoring is that we can get references to each individual function returned by the **curried function** and use it to our advantage.

For example, we can get a reference to all red products doing:

```typescript
const redLine = createOrder('red');
```

and then create variations of different sizes:

```typescript
const redSmall = redLine('S');
const redMedium = redLine('M');
```

and finally process the orders:
```typescript
const orderThree = redSmall(5);
const orderFour = redMedium(2);
```

That is, we would be caching partially applied functions. This does not only provide a great DX, but also would have added benefits in terms of performance, especially if the individual functions are heavy.