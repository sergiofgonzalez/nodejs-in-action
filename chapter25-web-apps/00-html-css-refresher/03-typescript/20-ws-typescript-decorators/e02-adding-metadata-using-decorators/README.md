# e02: Decorators &mdash; Decorators and Reflection metadata
> adding metadata to to classes and methods using decorators.

## Description

The example illustrates how to use decorators to add pieces of metadata so that you don't have to explicitly call `Reflect.defineMetadata` as it is done in the example [12: Decorators &mdash; Hello, metadata!](../12-hello-metadata).

Note that I had to use several variations to be able to correctly bind the piece of metadata at the correct class level or instance level.

In the decorator, you just have to use the `target.constructor` property, which receives the prototype of the class, not the instance, to bind it at the class level.

```typescript
function incCallCount(target: any, propertyName: string) {
  if (Reflect.hasMetadata('call-count', target.constructor, propertyName)) {
    const currValue = Reflect.getMetadata('call-count', target.constructor, propertyName);
    Reflect.defineMetadata('call-count', currValue + 1, target.constructor, propertyName);
  } else {
    Reflect.defineMetadata('call-count', 1, target.constructor, propertyName);
  }
}

function AuditMethod() {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return function(target: any, propertyName: string, descriptor: PropertyDescriptor) {
    // instance method
    if (descriptor.value) {
      const original = descriptor.value;
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      descriptor.value = function (...args: any[]) {
        incCallCount(target, propertyName); /* target is the prototype of the class */
        return original.apply(this, args);
      };
    }
...
  };
}
```

Then, in the function that scans the pieces of metadata:

```typescript
function showMethodInvocationCount(target: any) {
  for (const methodName of Object.getOwnPropertyNames(target.prototype)) {
    if (Reflect.hasMetadata('call-count', target.prototype.constructor, methodName)) {
      const callCountValue = Reflect.getMetadata('call-count', target.prototype.constructor, methodName);
      console.log(`${ methodName } call count: ${ callCountValue }`);
    } else {
      console.log(`${ methodName } call count: no data available`);
    }
  }
}

...
showInstanceCount(Teacher);
```

You invoke the function with the class, and you have to explicitly access its constructor to read the pieces of metadata bound to the class.

Finally, to bind the count to the instances you do:

```typescript
function incInstanceCallCount(obj: any, propertyName: string) {
  if (Reflect.hasMetadata('call-count', obj, propertyName)) {
    const currValue = Reflect.getMetadata('call-count', obj, propertyName);
    Reflect.defineMetadata('call-count', currValue + 1, obj, propertyName);
  } else {
    Reflect.defineMetadata('call-count', 1, obj, propertyName);
  }
}

function AuditMethod() {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return function(target: any, propertyName: string, descriptor: PropertyDescriptor) {
    // instance method
    if (descriptor.value) {
      const original = descriptor.value;
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      descriptor.value = function (...args: any[]) {
        incCallCount(target, propertyName);
        incInstanceCallCount(this, propertyName);
        return original.apply(this, args);
      };
    }
    ...
  };
}
```

Note that the instance is sent via `this`.

Then to read that instance level metadata you do:

```typescript
function showInstanceMethodInvocationCount(obj: any) {
  for (const methodName of Object.getOwnPropertyNames(Object.getPrototypeOf(obj))) {
    if (Reflect.hasMetadata('call-count', obj, methodName)) {
      const callCountValue = Reflect.getMetadata('call-count', obj, methodName);
      console.log(`${ methodName } call count for this instance: ${ callCountValue }`);
    } else {
      console.log(`${ methodName } call count for this instance: no data available`);
    }
  }
}

showInstanceMethodInvocationCount(teacher3);
```