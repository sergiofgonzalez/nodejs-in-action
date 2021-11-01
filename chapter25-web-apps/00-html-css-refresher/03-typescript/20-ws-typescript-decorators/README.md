# TypeScript: Chapter 20 &mdash; Workshop: Decorators
> tbd

## Contents


## Importance of decorators

Decorators are tightly coupled with a concept called **reflection** &mdash; the capability of a certain piece of code to examine things such as variables, functions, and classes defined in it.

JavaScript does not have an extensive reflection API, and that's why TypeScript had to provide this functionality on its own. Because this is not part of the standard, reflection/decorators can only be used when the following options are enabled:

```json
/* Experimental Options */
"experimentalDecorators": true,              /* Enables experimental support for ES7 decorators. */
"emitDecoratorMetadata": true,               /* Enables experimental support for emitting type metadata for decorators. */
```

Decorators are just special wrapping functions that add behavior to regular methods, classes, and properties.  They are especially useful to solve cross cutting concerns.

TypeScript supports the following decorator types:
+ **class decorators** &mdash; decorators attached to a class declaration.
+ **method decorators** &mdash; decorators attached to method declarations.
+ **accessor decorators** &mdash; decorators attached to the declaration of an accessor of a property.
+ **property decorators** &mdash; decorators attached to a property.
+ **parameter decorators** &mdash; decorators attached to a single parameter in a method declaration.

```typescript
@ClassDecorator
class MyClass {
  @PropertyDecorator
  myPublicProperty: number = 0;

  private _myPrivateProperty: number = 0;

  @AccessorDecorator
  public get myPrivateProperty() { return this._myPrivateProperty };

  @MethodDecorator
  public myMethod(@ParameterDecorator myParam: string) {}
}
```

The decorators might have an specific signature:

```typescript
function ClassDecorator(constructor: Function) {}

function AccessDecorator(target: any, propertyName: string, descriptor: PropertyDescriptor) {}

function MethodDecorator(target: any, propertyName: string, descriptor: PropertyDescriptor) {}

function ParameterDecorator(target: any, propertyName: string, parameterIndex: number) {}
```

| NOTE: |
| :---- |
| By convention, decorator functions use `PascalCase` instead of `camelCase`. |

## Decorator factories

As the signature for *decorators* is fixed, and the argument passing is handled by the TypeScript compiler, there is no way to customize your decorators directly, for example, to pass additional parameters.

However, you can use a pattern called **decorator factories** &mdash; functions that return decorators. Decorator factories can be used in the same place you'd use a regular decorator:

```typescript
function ClassDecoratorFactory(myAdditionalParam: string) {
  console.log(`Inside the decorator factory: ${ myAdditionalParam }`);
  return function (constructor: Function) {
    /* myAdditionalParam is available here! */
    console.log(`Inside the decorator: ${ myAdditionalParam }`);
  };
}

@ClassDecoratorFactory('myString')
class MyClass { }
```

| NOTE: |
| :---- |
| The `console.log` statements will be executed without having to instantiate the `MyClass`. |

| EXAMPLE: |
| :------- |
| See [01: Decorators &mdash; Hello, Decorator Factories!](01-hello-decorator-factories) for a runnable example. |

## Class decorators

A class decorator is a decorator function that is applied to the whole class. It can be used to observe, change, or replace wholesale a class definition.

When a class decorator is called, it receives a single parameter &mdash; the constructor of the calling class.

### Property injection

Property injection is one of the most common scenarios that class decorations are used for.

Consider the following snippet that defines a `Teacher` class with a constructor that accepts an `id` that represents the teacher and a `name`:

```typescript
class Teacher {
  constructor(public id: number, public name: string) {}
}
```

Now, let's imagine that over the time we want to enhance the system with a token-based authorization system. This is a cross-cutting concern not directly related to the teaching domain model. As such, it's better to include it in a transparent way using a decorator:

```typescript
@Token
class Teacher {
  constructor(public id: number, public name: string) {}
}
```

You can then inject a token property in the constructor:

```typescript
function Token(constructor: Function) {
  constructor.prototype.token = true;
}
```

The newly injected property can then be accessed from the `Teacher` instances:
```typescript
const myTeacher = new Teacher(1, 'Jason Isaacs');
// eslint-disable-next-line @typescript-eslint/no-explicit-any
console.log(`token: ${ (<any>myTeacher).token }` );
```

| EXAMPLE: |
| :------- |
| See [02: Decorators &mdash; Class Decorators: Property Injection](02-class-decorator-property-injection) for a runnable example. |

#### Getting rid of the casting to `any`

A reasonable way to get rid of the casting to `any` is to define a type that includes the `token` property.

```typescript
type SchoolPerson = {
  id: number,
  name: string,
  token?: boolean
}
```

Note that this can be hidden in the authorization library, so that the business application code is completely unaware of the existence of such type. For example, you can define a function that works both for `Teacher` and `Student` instances (application code)

```typescript
function gradeExams(responsible: Teacher | Student) {
  if (isAuthorized(responsible)) {
    console.log(`${ responsible.name }: Grading exams!`);
  } else {
    console.error(`ERROR: Sorry, pal! You're not supposed to grade exams!`);
  }
}
```

and yet, the cross-cutting concern is using the *injected property* without referring to `any`:

```typescript
function isAuthorized(subject: SchoolPerson) {
  return subject.token;
}
```

| EXAMPLE: |
| :------- |
| See [03: Class Decorators: Creating a simple class decorator factory](03-class-decorator-factory) for a runnable example illustrating these concepts. |

### Constructor extension

You can use a *class decorator* to add data to constructed objects. If you return a function from the decorator, that function will be used as a replacement constructor for the class.

While this would let you replace the class in its entirety, it is recommended to use this approach only to *augment the class with new behaviors or data*, as more substantial changes might result in a poor DX.

For example, the following snippet adds a `token` property on the constructed objects:

```typescript
type Constructable = {
  // eslint-disable-next-line @typescript-eslint/ban-types, @typescript-eslint/no-explicit-any
  new(...args: any[]): {}
}

function Token(hasToken: boolean) {
  return function <T extends Constructable>(constructor: T) {
    return class extends constructor {
      token: boolean = hasToken;
    };
  };
}
```

The syntax is ugly as hell, but you can use it as a template when you want to agument an existing class via constructor extension. This will ensure that the original constructor is left *untouched* while you add more properties as required.

Note also that you **cannot** add behaviors in this way:

```typescript
function Token(hasToken: boolean) {
  return function <T extends Constructable>(constructor: T) {
    return class extends constructor {
      token: boolean = hasToken;
      console.log(`Augmenting with behaviors`); // ERR: unexpected keyword or identifier
    };
  };
}
```

| EXAMPLE: |
| :------- |
| See [04: Decorators &mdash; Class Decorators: Hello, constructor extension!](04-class-decorator-constructor-extension) for a runnable example. |

### Constructor wrapping

You can use decorators to inject *behaviors* (code) when an instance of a class is created. This is useful to add some cross-cutting concerns such as logging, but it is not recommended to entirely change the behavior of the existing constructor.

The following snippet illustrates how this can be achieved:

```typescript
type Constructable = {
  // eslint-disable-next-line @typescript-eslint/ban-types, @typescript-eslint/no-explicit-any
  new(...args: any[]): {}
}

function WrapConstructor(message: string) {
  return function <T extends Constructable>(constructor: T) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const wrappedConstructor: any = function (...args: any[]) {
      console.log(` >> Decorating the class with ${ message }`);
      const result = new constructor(...args);
      console.log(` >> The underlying constructor has been executed`);
      return result;
    };
    wrappedConstructor.prototype = constructor.prototype;
    return wrappedConstructor;
  };
}
```

In the previous snippet, we log some information before and after calling the constructor we're wrapping.

Usage is the expected one:

```typescript
@WrapConstructor('decorator')
class Teacher {
  constructor(public id: number, public name: string) {
    console.log(`In Teacher's constructor`);
  }
}

const teacher = new Teacher(1, 'Jason Isaacs');
```

Nothing will be printed until we instantiate an object, and at that point we will see:

```
  >> Decorating the class with decorator
In Teacher's constructor
  >> The underlying constructor has been executed
```
| EXAMPLE: |
| :------- |
| See [05: Class Decorators: constructor wrapping](05-class-decorator-constructor-wrapping) and [06: Class Decorators: creating a logging decorator for a class](06-class-decorator-constructor-wrapping-logging) for runnable examples of class decorators.<br>See [07: Class Decorators: Augmenting a constructor with properties and behavior](07-class-decorator-constructor-augmentation) for an example that augments the constructor with both properties and behavior. |

## Method and accessor decorators

A method decorator is a decorator function that is applied to a single method of a class. It can be used to observe, modify, or replace a method definition.

The method decorator is called with three arguments:
+ `target` &mdash; for instance methods, it's the prototype of the class; for static methods, it's the constructor of the class. Usually, you type this parameter as `any`.
+ `propertyKey` &mdash; the name of the method you're decorating.
+ `descriptor` &mdash; the property descriptor of the method you're decorating. The `PropertyDescriptor` is an interface defined as:
```typescript
interface PropertyDescriptor {
  configurable?: boolean;
  enumerable?: boolean;
  writable?: any;
  value?: any;
  get?: any;
  set?(v: any): void;
}
```

We will also be using a *typed version* of this interface known as `TypedPropertyDescriptor`:

```typescript
interface TypedPropertyDescriptor<T> {
  configurable?: boolean;
  enumerable?: boolean;
  writable?: boolean;
  value?: T;
  get?: () => T;
  set?: (value: T) => void;
}
```

| NOTE: |
| :---- |
| The interfaces above define the value of an object's property, as well as the object's property properties. |

If you set up a decorator on a method you'll be getting a `PropertyDescriptor` instance of the method you're decorating, and the `value` property will give you access to its body. If you set up a decorator on an accessor you'll also be getting a `PropertyDescriptor` instance of the corresponding instance, with its `get` and `set` properties configured to the getter and setter accessor. In particular, TypeScript will enforce that you only set the decorator on either the setter or the getter but not in both.

The method decorators do not have to return a value. If you do, the value will replace the originally provided property descriptor.

The following snippet defines a decorator for instance methods/accessors that simply prints the arguments received.

```typescript
function MethodDecorator(target: any, propertyKey: string, descriptor: PropertyDescriptor) {
  console.log(`Target is`, target);
  console.log(`Property name is`, propertyKey);
  console.log(`Descriptor is`, descriptor);
}
```

It can then be used in instance methods and on a setter or getter of a given property:

```typescript
class Teacher {
  private _title = '';

  constructor(public name: string) {}

  @MethodDecorator
  public get title() {
    return this._title;
  }

  public set title(value: string) {
    this._title = this.title;
  }

  @MethodDecorator
  public teach() {
    console.log(`${ this.name } is teaching`);
  }
}
```

| NOTE: |
| :---- |
| You cannot use `@MethodDecorator` on the constructor. If you want to modify the constructor you have a to use a *class decorator* instead. |

| EXAMPLE: |
| :------- |
| See [08: Method Decorators: Instance method/accesor decorator](08-method-decorator-instance-method-accessor-decorator) for a runnable example on the concepts of this section and [09: Method Decorators: creating a decorator that marks a function enumerable](09-method-decorator-instance-method-decorator) for an exercise. |

### Decorators on static functions

Exactly the same reasoning and signature of the decorator is used for static functions:

```typescript
function MethodDecorator(target: any, propertyKey: string, descriptor: PropertyDescriptor) {
  console.log(`Target is`, target);
  console.log(`Property name is`, propertyKey);
  console.log(`Descriptor is`, descriptor);
}
```

And it is applied in the same way:
```typescript
class Teacher {
  private _title = '';

  constructor(public name: string) {}

  public get title() {
    return this._title;
  }

  public set title(value: string) {
    this._title = this.title;
  }

  public teach() {
    console.log(`${ this.name } is teaching`);
  }

  @MethodDecorator
  public static showUsage() {
    console.log(`This is the 'Teacher' class`);
  }
}
```
| EXAMPLE: |
| :------- |
| See [10: Method Decorators: Static method decorator](10-method-decorator-static-method-decorator) for a runnable example. |

### Method wrapping decorators

The most common (and recommended) usage of method decorators is to use it to wrap the original method adding some cross-cutting concern such as error handling, logging, or authorization checks.

You do that by using the `value` property of a method property descriptor when decorating an instance method, or by using the `get` and `set` properties of the descriptor when decorating a property accessor.

| EXAMPLE: |
| :------- |
| See [11: Decorators &mdash; Method Decorators: Method wrapping decorator](11-method-decorator-method-wrapping) for a runnable example that illustrates how to wrap the original method using decorators. |

## Using metadata in decorators

There's an ongoing proposal to add proper metadata support to JavaScript. In the meantime, you can rely on the [`reflect-metadata`](https://www.npmjs.com/package/reflect-metadata) to obtain that information that also requires setting to true the `emitDecoratorMetadata` flag in your `tsconfig.json`.

### Reflect object

## Property decorators

## Parameter decorators

## Application of multiple decorators on a single target

## Summary

## You know you've mastered this chapter when...

## Exercises, code examples, and mini-projects

### [01: Hello, Decorator Factories!](01-hello-decorator-factories)
Introduces decorator factories.

### [02: Class Decorators: Property Injection](02-class-decorator-property-injection)
Illustrates one of the common use cases of class decorators: the injection of properties on a given class.

### [03: Class Decorators: Creating a simple class decorator factory](03-class-decorator-factory)
Illustrates one of the common use cases of class decorators: the injection of properties on a given class.

### [04: Class Decorators: Hello, constructor extension!](04-class-decorator-constructor-extension)
Illustrates how to create a constructor extension that augments the constructor of a given class with additional properties.

### [05: Class Decorators: constructor wrapping](05-class-decorator-constructor-wrapping)
Adding behaviors to a constructor using a decorator factory.

### [06: Class Decorators: creating a logging decorator for a class](06-class-decorator-constructor-wrapping-logging)
Using decorators to inject behavior that is executed each time an instance of a class is created.

### [07: Class Decorators: Augmenting a constructor with properties and behavior](07-class-decorator-constructor-augmentation)
Using decorators to inject properties and behavior by way of a class constructor.

### [08: Method Decorators: Instance method/accesor decorator](08-method-decorator-instance-method-accessor-decorator)
Illustrates how to define and use an instance method/accessor decorator

### [09: Method Decorators: creating a decorator that marks a function enumerable](09-method-decorator-instance-method-decorator)
Defining an instance method decorator factory function that makes the decorated instance or accessor enumerable.

### [10: Method Decorators: Static method decorator](10-method-decorator-static-method-decorator)
Illustrates how to define and use a static method decorator]

### [11: Method Decorators: Method wrapping decorator](11-method-decorator-method-wrapping)
Illustrates how to define a method decorator that wraps the original instance/static method or property accessor with additional logging.

## ToDo
- [ ] Review concepts on decorators from the book
- [ ] Review https://github.com/microsoft/TypeScript/issues/40805 to see if you can get rid of `any` in the specs.
