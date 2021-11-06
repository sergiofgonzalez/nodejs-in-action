# TypeScript: Chapter 20 &mdash; Workshop: Decorators
> TypeScript decorators and Reflection metadata in action

## Contents
+ Introduction to the role of decorators
+ Decorators and decorator factories
+ Class decorators and their use cases
+ Method/accessor decorators and their use cases
+ Property decorators and their use cases
+ Method parameter decorators and their use cases
+ TypeScript reflection and metadata system

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

function PropertyDecorator(target: any, propertyName: string) {}

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

| NOTE: |
| :---- |
| To enable these capabilities you have to also include in your program `import 'reflect-metadata'`. |

The following methods are the ones you'll use more frequently:

+ `Reflect.defineMetadata` &mdash; defines a piece of metadata on a class or method.
+ `Reflect.hasMetadata` &mdash; returns a boolean indicating whether a certain piece of metadata is present.
+ `Reflect.getMetadata` &mdash; returns the actual piece of metadata, if present.

Consider the following `Teacher` class, that we will use to define some pieces of metadata:

```typescript
import 'reflect-metadata';

class Teacher {
  #title = '';

  constructor(public name: string) {}

  get title() {
    return this.#title;
  }

  set title(value: string) {
    this.#title = value;
  }

  teach() {
    console.log(`${ this.name } is teaching`);
  }
}
```

To define a piece of metadata called `instance-count` at the class level you would do:

```typescript
Reflect.defineMetadata('instance-count', 0, Teacher);
```

To define a similar piece of metadata at the method level you would do:

```typescript
Reflect.defineMetadata('call-count', 0, Teacher, 'teach');
```

| NOTE: |
| :---- |
| Note that in the snippet above you are defining `call-count` **also** at the class level, only that you're binding the metadata to a method name, rather than to the class itself. |


Also, you can also bind a piece of metadata for a method at the instance-level:

```typescript
const teacher = new Teacher('Jason Isaacs');
const currValue = Reflect.defineMetadata('call-count', this, 'teach');
```


Similarly, to read the `instance-count` you'd do:

```typescript
if (Reflect.hasMetadata('instance-count', Teacher)) {
  const value = Reflect.getMetadata('call-count', Teacher);
}
```

And to read `call-count` at the class level you'd do:
```typescript
if (Reflect.hasMetadata('instance-count', Teacher, 'teach')) {
  const value = Reflect.getMetadata('call-count', Teacher, 'teach');
}
```

And to read `call-count` at the instance level:

```typescript
if (Reflect.hasMetadata('instance-count', teacher, 'teach')) {
  const value = Reflect.getMetadata('call-count', teacher, 'teach');
}
```

| EXAMPLE: |
| :------- |
| See [13: Adding and reading metadata in a class and its methods](13-adding-and-reading-metadata-in-class-and-methods) for a runnable example illustrating how to use those methods. See also [e02: Decorators &mdash; Decorators and Reflection metadata](e02-adding-metadata-using-decorators) for an exercise illustrating how to set the metadata via decorators. |

## Property decorators

A property decorator is a decorator you apply to a single property of a class. Such decorator is typically used to observe that property.

A property decorator is a function that receives:

+ `target` &mdash; can be either the prototype of the class for instance properties, or the constructor of the class for static properties.
+ `propertyKey` &mdash; the name of the property you're decorating.

The return value of a property decorator is ignored, as there is nothing to replace.

The following snippet illustrates the shape of a property decorator factory:

```typescript
function PropertyDecorator(message: string) {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return function (target: any, propertyKey: string) {
    console.log(`${ target.constructor.name }.${ propertyKey } decorated with ${ message }`);
  };
}
```

We can then use it to decorate the properties of a class:

```typescript
class Teacher {

  @PropertyDecorator('ID')
  id: number;

  @PropertyDecorator('NAME')
  name: string;

  constructor(id: number, name: string) {
    this.id = id;
    this.name = name;
  }
}
```

Note that the decorator functions will be invoked without even creating an instance of the class. That is why these type of decorators are known as *passive* as they're invoked by the engine.

| EXAMPLE: |
| :------- |
| See [14: Property Decorator: hello, property decorators!](14-property-decorator-hello) for a runnable example. See also [15: Property Decorators: creating and using a property decorator](15-property-decorator-creating-and-using) for an example illustrating how to mix metadata and property decorators. |

## Parameter decorators

A parameter decorator is a decorator function applied to a single parameter of a funcion call. Just like property decorators, parameter decorators are *passive* and should only be used to observe values, and not to inject and execute code.

The return value of a parameter decorator is also ignored.

When a parameter decorator is called, it receives three arguments:
+ `target` &mdash; can be either the prototype of the class for instance properties, the constructor of the class for static properties, or the class itself when decorating a constructor parameter.
+ `propertyKey` &mdash; the name of the method whose parameter you're decorating, or `undefined` when decorating a constructor parameter.
+ `parameterIndex` &mdash; ordinal index of the parameter in the function's parameter list (starting from zero).


Therefore, an example of a parameter decorator can be:

```typescript
function ParameterDecorator(target: any, propertyName: string, parameterIndex: number) {
  console.log(`Target is:`, target);
  console.log(`Property name is: `, propertyName);
  console.log(`Parameter index is:`, parameterIndex);
}
```

and the things that are received in the `target`, `propertyName`, and `parameterIndex` will vary depending on where the `@ParameterDecorator` is applied.


| EXAMPLE: |
| :------- |
| See [16: Parameter Decorators: Hello, parameter decorators!](16-parameter-decorator-hello) for a runnable example. See also [17: Parameter Decorators: using parameter and method decorators to implement validation](17-parameter-decorator-required-param) for an example in which parameter decorators, method decorators, and metadata are used to implement validation. |

## Application of multiple decorators on a single target

It's common to apply more than one decorator on a single target. In essence, decorators are functions, and the rule of functional composition is applied so that the decorators are evaluated bottom-up. This means that the decorator closest to the target is evaluated first.

There is a catch though when using decorator factories, as the factories are regular functions that are executed in source code order.

Consider the following snippet in which two decorator factories are defined and applied to the same target:

```typescript
function First() {
  console.log(`In the first Decorator factory...`);
  // eslint-disable-next-line @typescript-eslint/ban-types, @typescript-eslint/no-unused-vars
  return function (constructor: Function) {
    console.log(`First decorator`);
  };
}

function Second() {
  console.log(`In the second Decorator factory...`);
  // eslint-disable-next-line @typescript-eslint/ban-types, @typescript-eslint/no-unused-vars
  return function (constructor: Function) {
    console.log(`Second decorator`);
  };
}


@First()
@Second()
class Target {}
```

If we run the code we will see:

```
In the first Decorator factory...
In the second Decorator factory...
Second decorator
First decorator
```

So, the first decorator factory is executed first, followed by the second decorator factory, but then the decorators are applied according to the bottom-up rule.


| EXAMPLE: |
| :------- |
| See [18: Decorators &mdash; Decorator factories composition](18-decorator-factories-composition) for a runnable example. |


## Summary

This section summarizes the most common practices in relation to decorators and metadata.

TypeScript allows you to use decorators in classes, properties, methods (instance and static methods), accessors, properties and method parameters:

```typescript
@ClassDecorator
class MyClass {
  @PropertyDecorator
  myPublicProperty: number = 0;

  #myPrivateProperty: number = 0;

  @AccessorDecorator
  public get myPrivateProperty() { return this.#myPrivateProperty };

  @MethodDecorator
  public myMethod(@ParameterDecorator myParam: string) {}
}
```

The decorators are regular functions with a specific signature. The parameters are injected into the functions by TypeScript engine:

```typescript
function ClassDecorator(constructor: Function) {}

function AccessDecorator(target: any, propertyName: string, descriptor: PropertyDescriptor) {}

function MethodDecorator(target: any, propertyName: string, descriptor: PropertyDescriptor) {}

function PropertyDecorator(target: any, propertyName: string) {}

function ParameterDecorator(target: any, propertyName: string, parameterIndex: number) {}
```


### Class decorator factories

Class decorator factories are used to create class decorators that accept parameters and that typically enhances the original class constructor with additional cross-cutting concerns such as authorization, logging, etc.

```typescript
// eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/ban-types
type Constructable = {
  new(...args: []): {}
}

function ClassDecorator(message: string) {
  return function <T extends Constructable>(constructor: T) {
    const wrappedConstructor: any = function (...args: any[]) {
      ...cross-cutting concerns...

      /* invoke the original constructor */
      return new constructor(...args);
    };
  };
  /* replace the constructor of the original class with the wrapped one */
  wrappedConstructor.prototype = constructor.prototype;

  return wrappedConstructor;
}
```

By doing so, the cross-cutting logic will be executed each time `new` is invoked.


Another common use case involves injecting a property through a class decorator factory:

```typescript
function ClassDecorator(message: string) {
  return function <T extends Constructable>(constructor: T) {
    return class extends constructor {
      newProperty: newPropertyType = propertyValue;
    };
  }
}
```

### Class decorators

Class decorators are used to enhance classes with functionality that do not require parameter customization.

They are typically used to inject additional properties in a class:

```typescript
function ClassDecorator(constructor: Function) {
  constructor.prototype.newProperty = valueForNewProperty;
}
```

### Method decorators

Method decorators are used to create decorators that do not require parameters and that can be bound to instance, static methods, or getters/setters of a given property. They are typically used to wrap existing methods with additional cross-cutting logic that can be applied before and after the original method is invoked.

```typescript
function MethodDecorator(target: any, propertyKey: string, descriptor: PropertyDescriptor) {

  /* applied to instance method? */
  if (descriptor.value) {
    const original = descriptor.value;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    descriptor.value = function (...args: any[]) {
      ...pre-invocation logic...

      /* original method invocation */
      const result = original.apply(this, args);

      ...post-invocation logic...

      /* return result (might have ben modified) ^*/
      return result;
    };
  }

  // getter
  if (descriptor.get) {
    const original = descriptor.get;
    descriptor.get = function () {
      ...pre-invocation logic...

      /* original setter invocation */
      const result = original.apply(this, []);

      ...post-invocation logic...

      /* return result (might have ben modified) ^*/
      return result;
    };
  }

  // setter
  if (descriptor.set) {
    const original = descriptor.set;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    descriptor.set = function (value: any) {
      ...pre-invocation logic...

      /* original setter invocation */
      const result = original.apply(this, [value]);

      ...post-invocation logic...

      /* return result (might have ben modified) ^*/
      return result;
    };
  }
}
```

******************************************************************************************************* REview and include the same in property
Note that `target` is the prototype of the class for instance methods and the constructor of the class for static methods. Effectively, this means that `typeof target === 'function'` for static methods and `typeof target === 'object'` for instance methods.

As a result, you can have function that works for both static and instance methods:

```typescript
function
```

### Method decorator factories

Method decorator factories are used to create decorators that accept parameters.

```typescript
function MethodDecorator(message: string) {
  return function (target: any, propertyKey: string, descriptor: PropertyDescriptor) {
    /* regular method decorator (see prev section) */
  };
}
```

See [Method decorators](#method-decorator) for information on how to implement method decorators.

### Parameter decorators

Parameter decorators are used to decorate parameters of a method. As those are executed only once without requiring method invocation or instantiation of the associated class they are typically used as *anchors* for method decorators. As such, you would typically used them to bind metadata information about the parameter that can be subsequently used by other decorators.

```typescript
function ParameterDecorator(target: any, propertyName: string, parameterIndex: number) {
  ...metadata binding logic here...
}
```

See [Metadata binding](#metadata-binding) for further information on how to bind metadata to classes and methods.


### Property decorator factories

Property decorator factories are used to decorate the properties of a class with parameters. These decorators are executed only once without requiring class instatiation. As a result, these decorators are typically used as *anchors* to inject metadata at the corresponding property level.

```typescript
function PropertyDecorator(message: string) {
  return function (target: any, propertyKey: string) {
    ...metadata binding logic here...
  };
}
```


*************************************************************************************** Review

Note that `target` is the prototype of the class for instance methods and the constructor of the class for static methods. Effectively, this means that `typeof target === 'function'` for static properties and `typeof target === 'object'` for instance properties.

```typescript
function PropertyDecorator(target: any, propertyName: string) {
  if (typeof target === 'function') {
    ... logic for static properties ...
  } else if (typeof target === 'object') {
    ... logic for instance properties ...
  } else {
    throw new Error('Unexpected typeof for target');
  }
}
```


### Metadata binding

The following recipes can be used when interacting with the metadata system in TypeScript.

Note that to enable the metadata system you need to:
+ Enable `"emitDecoratorMetadata": true` in the `tsconfig.json`.
+ Include the `reflect-metadata` dependency in your project and activate it using `import 'reflect-metadata`.

| NOTE: |
| :---- |
| Support for decorators and metadata is experimental and it is subject to change until it is standardized by the TC39 committee in charge of JavaScript language. |

#### General approach

The general approach includes the following steps:
+ Check if a piece of metadata has been bound to the target using `Reflect.hasMetadata()`.
  + If the metadata value is found:
    + Read the value asociated to the metadata key, and update it as needed.
    + Write the updated value (optionally)
  + Otherwise, create the metadata value using `Reflect.defineMetadata()`.

```typescript
if (Reflect.hasMetadata('metadata-key', target, propertyKey)) {
  const currValue = <cast>Reflect.getMetadata('metadata-key', target, propertyKey);
  const updatedValue = transform(currValue);
  Reflect.defineMetadata('metadata-key', updatedValue, target, propertyKey);
} else {
  Reflect.defineMetadata('metadata-key', initialValue, target, propertyKey);
}
```

#### Binding metadata to a class explicitly

You can bind a piece of metadata to a class explicitly using the name of the class:

```typescript
class A { }
Reflect.defineMetadata('metadata-key', initialValue, A);
```

#### Binding metadata to a class dinamically

When you don't have access to the class (as it happens when binding metadata from a generic decorator) you can use the constructor to dynamically bind metadata to a class:

```typescript
function ClassDecorator(...) {
  return function <T extends Constructable>(constructor: T) {
    const wrappedConstructor: any = function (...args: any[]) {
      ...
      Reflect.hasMetadata('metadata-key', wrappedConstructor);
      Reflect.getMetadata('metadata-key', wrappedConstructor);
      Reflect.defineMetadata('metadata-key', value, wrappedConstructor);
      ...
    };
  }
}
```

#### Binding metadata to a class instance method from a method decorator

You will typically bind metadata to a class instance method within a method decorator. In that case, you just have to use the parameters received in the decorator function:

```typescript
function MethodDecorator(target: any, propertyKey: string, descriptor: PropertyDescriptor) {
  ...
  Reflect.hasMetadata('metadata-key', target, propertyKey);
  Reflect.getMetadata('metadata-key', target, propertyKey);
  Reflect.defineMetadata('metadata-key', initialValue, target, propertyKey);
  ...
}
```

### Binding metadata to a class instance method from a parameter decorator

It is an usual practice to bind metadata information to an instance method related to the method parameters (mainly because you cannot create metadata associated to parameters themselves).

This is typically performed from a method parameter decorator:

```typescript
function ParameterDecorator(target: any, propertyKey: string, parameterIndex: number) {
  ...
  Reflect.hasMetadata('metadata-key', target, propertyKey);
  Reflect.getMetadata('metadata-key', target, propertyKey);
  Reflect.defineMetadata('metadata-key', initialValue, target, propertyKey);
  ...
}
```

### Binding metadata to a class property from a property decorator

It is an usual practice to bind metadata information to a class property in a property decorator:

```typescript
function PropertyDecorator(target: any, propertyKey: string) {
  ...
  Reflect.hasMetadata('metadata-key', target, propertyKey);
  Reflect.getMetadata('metadata-key', target, propertyKey);
  Reflect.defineMetadata('metadata-key', value, target, propertyKey);
  ...
}
```

## You know you've mastered this chapter when...

+ You understand what needs to be done to enable decorators and the metadata system. You're aware that both capabilities have not been standardized yet.

+ You're aware of the different types of decorators that are available in JavaScript:
  + class decorators
  + method and accessor decorators
  + property decorators
  + method parameter decorators

+ You're aware that each type of decorator is represented by a regular TypeScript function with a specific signature.

+ You understand that decorator factories have to be used when you need to customize a decorator with additional parameters.

+ You're comfortable using class decorators and class decorator factories for:
  + property injection
  + constructor wrapping

+ You're comfortable using method/accesor decorators for instance method, static methods and setters/getters of a particular property.
  + method wrapping

+ You're aware of the metadata and reflection capabilities, and you're comfortable using them in decorators.

+ You're comfortable using property decorators and know how to bind metadata to them.

+ You're comfortable using parameter decorators and know how to bind metadata to them.

+ You understand that decorators are applied in a bottom-up fashion, as if they were functions that are composed.

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

### [12: Decorators &mdash; Hello, metadata!](12-hello-metadata)
Illustrates how to use `Reflect.defineMetadata`, `Reflect.hasMetadata`, and `Reflect.getMetadata` to read metadata bound to classes and methods at the class level, and to read metadata bound to a method at the instance level.

### [13: Adding and reading metadata in a class and its methods](13-adding-and-reading-metadata-in-class-and-methods)
Illustrates how to use `Reflect.hasMetadata()`, `Reflect.defineMetadata()`, and `Reflect.getMetadata()` at the class level and its methods (at the class level).

### [14: Property Decorator: hello, property decorators!](14-property-decorator-hello)
Illustrates how to create property decorators.

### [15: Property Decorators: creating and using a property decorator](15-property-decorator-creating-and-using)
Illustrates how to mix metadata and property decorators.

### [16: Parameter Decorators: Hello, parameter decorators!](16-parameter-decorator-hello)
illustrates how to define parameter decorators and the different types of arguments it receives.

### [17: Parameter Decorators: using parameter and method decorators to implement validation](17-parameter-decorator-required-param)
An example in which parameter decorators, method decorators and metadata to implement validations.

### [18: Decorators &mdash; Decorator factories composition](18-decorator-factories-composition)
Illustrates how the composition works when applying multiple decorators to a single target via decorator factories.

### [e01: Method Decorators: Instance and call counting](e01-method-decorator-instance-and-call-counting)
Wrapping class decorators and wrapping method decorators in action.

### [e02: Decorators and Reflection metadata](e02-adding-metadata-using-decorators)
Adding metadata to to classes and methods using decorators.

### [e03: Decorators &mdash; Using decorators to apply cross-cutting concerns](e03-using-decorators-for-cross-cutting-concerns)
Summary exercise illustrating the use of decorators for classes, methods and parameters, along with metadata and reflection in a more contrived example.

## ToDo
