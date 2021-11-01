# 07: Decorators &mdash; Class Decorators: Augmenting a constructor with properties and behavior
> using decorators to inject properties and behavior by way of a class constructor

## Description

In this example it is illustrated two techniques to augment an existing class with both properties and behavior.

In the first technique, you just have to use the `constructor.prototype` to add properties to the class:

```typescript
function LogClass(message: string) {
  return function <T extends Constructable>(constructor: T) {
    constructor.prototype.logger = logger;  // augment properties
    logger.info(message);                   // add behavior
    return constructor;
  };
}
```

In the second technique, you use another approach with similar effects:

```typescript
function LogAndToken(message: string, hasToken: boolean) {
  return function <T extends Constructable>(constructor: T) {
    // augment properties
    const augmentedConstructor = class extends constructor {
      token: boolean = hasToken;
    };
    logger.info(message); // add behavior
    return augmentedConstructor;
  };
}
```