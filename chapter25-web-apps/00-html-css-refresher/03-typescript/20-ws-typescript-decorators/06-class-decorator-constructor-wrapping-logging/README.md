# 06: Decorators &mdash; Class Decorators: creating a logging decorator for a class
> using decorators to inject behavior that is executed each time an instance of a class is created.

## Exercise 7.03

In this exercise you'll be creating a constructor wrapping decorator factory. The decorator `LogClass` will wrap the class constructor with a logging statement.

1. Create a `Teacher` class with public properties `id` (number) and `name` (string).

2. Instantiate an instance of the `Teacher` class and validate that your application runs.

3. Add the `Constructable` type definition that helps you define the class decorator function:

```typescript
type Constructable = {
  // eslint-disable-next-line @typescript-eslint/ban-types, @typescript-eslint/no-explicit-any
  new(...args: any[]): {}
}
```

4. Create a *decorator factory* `LogClass()` that receives a `message` argument of type string. The implementation of the factory must return a class decorator function, that initally will simply return the constructor.

```typescript
// function to return in the decorator factory
function <T extends Constructable>(constructor: T) {
    return constructor;
}
```

5. Decorate the `Teacher` class and confirm that the applications works as expected.

6. Create a simple `logger` object with an `info(message: string)` method that uses `console.log()` to print the received argument in the screen.

7. Modify the wrapping constructor code so that instead of simply returning the constructor, you also use the `logger.info()` method to print the message configured in the decorator.

8. Confirm that when doing so, the log is executed only once, instead of each time `new Teacher()` is used. HINT: you can confirm that creating a loop that creates a few `Teacher` instances.

9. Modify the implementation of the decorator according to the following snippet:
```typescript
function LogClass(message: string) {
  return function <T extends Constructable>(constructor: T) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const loggingConstructor: any = function (...args: any[]) {
      logger.info(message);
      return new constructor(...args);
    };
    loggingConstructor.prototype = constructor.prototype;
    return loggingConstructor;
  };
}
```

10. Validate that now the log is printed each time a new instance of the class is created.