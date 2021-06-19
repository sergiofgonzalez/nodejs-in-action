# TypeScript: Chapter 06 &mdash; Decorators
> decorators


## Contents
+ Setting up decorators support
+ Decorators syntax
+ Decorators types (class, property, function and method) and usage

## Intro

Decorators allow you to inject code into the definition of a class before a class instance is created. They are similar to attributes in C#, or annotations in Java.

JavaScript decorators are only at stage 2 proposal, so it might take a while before they are adopted into the JavaScript standard. In TypeScript, they have been supported for quite some time already but they are still considered *experimental*, and therefore, subject to breaking changes in the future.

However, they are very popular in many frameworks such as *Angular* and *Vue*.

## Decorator overview

### Decorator setup

In order to enable decorators, you need to turn on the `experimentalDecorators` property in your `tsconfig.json`:

```json
{
  "compilerOptions": {
    ...
    "experimentalDecorators": true,
    ...
  }
}
```

### Decorator syntax

A *decorator* is a function that is called with a specific set of parameters. These parameters are automatically populated by the JavaScript runtime, and contain information about the class, method, or property to which the *decorator* has been applied.

The following function represents the implementation of a *class decorator*:

```typescript
function simpleClassDecorator(constructor: Function) {
  console.log(`simpleClassDecorator activated!`);
}
```

See that it is a single parameter function that accepts an argument of type `Function`.

That function can be used as a *class decorator* (due to the parameters it defines):

```typescript
@simpleClassDecorator
class MyClass {
}
```

If we execute the program as-is, we will see that even when we haven't instantiated any instance of `MyClass`, the decorator function is being called.

That means that you haven't had to wait until the class is created &mdash; the runtime has invoked the *decorator* function as soon as it has seen the class definition.

That also means, that the decorator will be called only once, and before any of the instances are created.

> Class decorators are only invoked once, when a class is defined.

### Multiple decorators

A given target (such as a class), can be applied many decorators:

```typescript
@simpleClassDecorator
@anotherDecorator
class MyClass {
}
```

If we create the implementation of the decorator as:

```typescript
function anotherDecorator(constructor: Function) {
  console.log(`anotherDecorator activated!`);
}
```

we would see that `@anotherDecorator` function is invoked before `@simpleClassDecorator`:

> Decorators are called in reverse order of their appearance within our code.

### Types of decorators

TypeScript supports the following types of decorators:
+ **Class decorators**: applied to class definitions.
+ **Property decorators**: applied to properties within a class.
+ **Method decorators**: applied to methods on a class.
+ **Parameter decorators**: applied to method parameters of a class.

The following code declares one instance of each type:

```typescript
function classDecorator(constructor: Function) { }
function propertyDecorator(target: any, propertyKey: string) { }
function methodDecorator(target: any, methodName: string, descriptor?: PropertyDescriptor) { }
function parameterDecorator(target: any, methodName: string, parameterIndex: number) { }
```

Those would be applied as follows:

```typescript
@classDecorator
class MyClass {
  @propertyDecorator
  id: number = 1;

  @methodDecorator
  print() { }

  setId(@parameterDecorator id: number) { }
}
```


### Decorator factories

Oftentimes you will need to define a decorator that expects certain parameters.

That can be achieved with the following technique known as a *decorator factory*:

```typescript
function decoratorFactory(message: string) {
  return (constructor: Function) => {
    console.log(`decoratorFactory invoked with ${message}`);
  };
}

@decoratorFactory('Hello to Jason Isaacs!')
class MyOtherClass {
}

@decoratorFactory('Hello to Idris Elba!')
class MyYetAnotherClass {
}
```

Note how `decoratorFactory()` function returns a *class decorator* customized with the given parameter.

## Exploring decorators

### Class decorators

Class decorators are functions with the following signature:

```typescript
function classDecorator(constructor: Function) {
  /* ... logic here ... */
}

@classDecorator
class ClassWithConstructor {
  constructor(id: number) { }
}
```

Class decorators can be used to modify the class definition to which they are applied:

```typescript
// eslint-disable-next-line @typescript-eslint/ban-types
function classDecorator(constructor: Function) {
  constructor.prototype.addedProperty = 'added property value';
}


@classDecorator
class MyDecoratedClass {
  constructor(public id: number) { }
}

const myObj = new MyDecoratedClass(55);
console.log((<any>myObj).addedProperty); // -> 'added property value'
```

In the example above, we have created a decorator that adds a new property to the class via the its *prototype*. Note that the property cannot be accessed in the regular way, but instead, we have had to cast the class instance to `<any>` in order to read its value.

### Property decorators

Property decorators are functions with the following signature:

```typescript
function propertyDecorator(target: any, propertyName: string) {
  /* ... logic here ... */
}

class MyClassWithDecoratedProperty {
  @propertyDecorator
  nameProperty: string | undefined;
}
```

Note that you will be able to get a reference to the class constructor through the `target.constructor` property:

```typescript
function propertyDecorator(target: any, propertyName: string) {
  console.log(`target:`, target);
  console.log(`target.constructor:`, target.constructor);
  console.log(`propertyName:`, propertyName);
  target[propertyName] = 'Hello to Jason Isaacs!';
  target.constructor.prototype.addedProperty = 'value for added property';
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
class MyClassWithDecoratedProperty {
  @propertyDecorator
  firstName: string | undefined;
}

const myObj2 = new MyClassWithDecoratedProperty();
console.log(myObj2);                      // -> MyClassWithDecoratedProperty {}
console.log(myObj2.firstName);            // -> Hello to Jason Isaacs!
console.log((<any>myObj2).addedProperty); // -> value for added property
```

### Static property decorators

Static property decorators share the same instance signature as instance property decorators:

```typescript
function staticPropertyDecorator(target: any, propertyName: string) {
  /* ... logic here ... */
}

class MyClassWithStaticDecoratedProperty {
  @staticPropertyDecorator
  static staticProperty: string;
}
```

with the difference being that the `target` argument for static properties is a function, instead of an `object` (as is for instance properties).

```typescript
function staticPropertyDecorator(target: any, propertyName: string) {
  console.log(`target:`, target);
  console.log(`typeof target:`, typeof target); // -> 'function'
  console.log(`propertyName:`, propertyName);
  target[propertyName] = 'foobar';
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
class MyClassWithDecoratedStaticProperty {
  @staticPropertyDecorator static staticProperty: string;
}

console.log(MyClassWithDecoratedStaticProperty.staticProperty); // -> foobar
```

Note that as a result, you can have a function that works for both instance and static properties:

```typescript
function dualPropertyDecorator(target: any, propertyName: string) {
  if (typeof target === 'function') {
    console.log(`static property decorator logic`);
    target[propertyName] = 'static';
  } else if (typeof target === 'object') {
    console.log(`instance property decorator logic`);
    target[propertyName] = 'instance';
  } else {
    throw new Error('Unexpected!');
  }
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
class MyClassWithDecoratedProperties {
  @dualPropertyDecorator static staticProperty: string;
  @dualPropertyDecorator message: string | undefined;
}

console.log(MyClassWithDecoratedProperties.staticProperty); // -> static
const obj3 = new MyClassWithDecoratedProperties();          // -> instance
console.log(obj3.message);
```

| NOTE: |
| :---- |
| Note that if `message` would be declared as a `number` instead of a string, the decorator logic would change the type to `string`, thus breaking the rules of type safety! |


### Method decorators

Method decorators are functions with the given signature:

```typescript
function methodDecorator(target: any, methodName: string, descriptor?: PropertyDescriptor) {
  /* ... decorator logic here ... */
}

class MyClassWithDecoratedMethod {
  @methodDecorator
  print(message: string) { }
}
```

Consider the following example, in which we use the method decorator to *own* the original function, overriding it with something else:

```typescript
function methodDecorator(target: any, methodName: string, descriptor?: PropertyDescriptor) {
  console.log(`target:`, target);
  console.log(`methodName:`, methodName);
  console.log(`descriptor:`, descriptor);
  console.log(`target[methodName]:`, target[methodName]);

  const originalFn = target[methodName];

  const newFn = function (this: any) {
    console.log(`The original function has been owned!`);
    // eslint-disable-next-line prefer-rest-params
    for (const arg of arguments) {
      console.log(`original function called with arg:`, arg);
    }
    originalFn.apply(this, ['Hello to Jason Isaacs!']);
  };

  target[methodName] = newFn;
  return target;
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
class MyClassWithDecoratedMethod {
  @methodDecorator
  print(message: string) {
    console.log(`message:`, message);
  }
}

const obj4 = new MyClassWithDecoratedMethod();
obj4.print('Hello, world!'); // -> The original functions has been owned!....
```

### Parameter decorators

Parameter decorators are functions with the following signature:

```typescript
function parameterDecorator(target: any, methodName: string, parameterIndex: number) {
  /* ... decorator logic here ... */
}

class MyClassWithDecoratedParameter {
  print(@parameterDecorator value: string) { }
}
```

Consider the following example:

```typescript
function parameterDecorator(target: any, methodName: string, parameterIndex: number) {
  console.log(`target:`, target);                 // -> {}
  console.log(`methodName:`, methodName);         // -> print
  console.log(`parameterIndex:`, parameterIndex); // -> 0
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
class MyClassWithDecoratedParameter {
  print(@parameterDecorator message: string) {
    console.log(message);
  }
}
```

Note that we're not giving any name or type information by the JavaScript runtime &mdash; only that the parameter decorator has been applied to the first parameter (index 0).

### Decorator metadata

The TypeScript compiler includes experimental support for decorators to carry extra metadata information, which will be helpful to understand how a decorator is used.

In order to activate it, we need to set `"emitDecoratorMetadata"` option to `true` in the `tsconfig.json`:

```json
{
  "compilerOptions": {
    ...
    "experimentalDecorators": true,
    "emitDecoratorMetadata": true,
    ...
  }
}
```

### Using decorator metadata

The following example shows how to use this experimental metadata:

```typescript
/* eslint-disable @typescript-eslint/no-unused-vars */
import 'reflect-metadata';

function parameterDecorator(target: any, methodName: string, parameterIndex: number) {
  const designType = Reflect.getMetadata('design:type', target, methodName);
  const designParamTypes = Reflect.getMetadata('design:paramtypes', target, methodName);
  const designReturnType = Reflect.getMetadata('design:returntype', target, methodName);


  console.log(`design:type=`, designType);
  designParamTypes.forEach((designParamType: any, index: number) => {
    console.log(`[${index}]: ${designParamType.name}`);
  });
  console.log(`design:returntype=`, designReturnType.name);
}

class MyClassWithDecoratedParameter {
  print(@parameterDecorator message: string, num: number, bool: boolean): number {
    console.log(message);
    return message.length;
  }
}
```

When we execute that program we get:

```
design:type= [Function: Function]
[0]: String
[1]: Number
[2]: Boolean
design:returntype= Number
```


The first thing to notice is that you need to install and use the [`reflect-metadata`](https://www.npmjs.com/package/reflect-metadata) package.

Then, you will be able to use `Reflect.getMetadata(...)` functions to obtain additional information about the methods, parameters and return type of the element that is being decorated.

All this information is recorded by the TypeScript compiler because we activated the `"emitDecoratorMetadata"` option. This information opens up a more robust use of the decorators to create sophisticated things such as code analysis tools, or frameworks for dependency injection.

| EXAMPLE: |
| :------- |
| See [03: Hello, *decorator's metadata*!](03-hello-decorators-metadata) for a runnable example. |

## You know you've mastered this chapter when...

+ You're aware that *decorators* are a experimental feature, and understand how to enable support to *decorators* in your `tsconfig.json`.

+ You're aware of the different types of *decorators*, the signatures for each of them, and how to apply them in your code.

+ You understand how *decorators* can become useful to enhance or control the classes decorated.

+ You're aware of the additional metadata the TypeScript compiler can include in the generated code when enabling `"emitDecoratorMetadata"` and how to access this information with the [`reflect-metadata`](https://www.npmjs.com/package/reflect-metadata) NPM module.

## Exercises, code examples, and mini-projects

### [01: Hello, *decorators*!](01-hello-decorators)
Introducing *decorators*.

### [02: Hello, *class decorators*!](02-hello-decorator-types)
Practising the different types of decorators.

### [03: Hello, *decorator's metadata*!](03-hello-decorators-metadata)
Using decorator's metadata experimental feature.

### [e01: A performance decorator for methods](e01-perf-decorator)
A *naive* decorator that prints in the console when a method is activated and how long it takes to execute.
