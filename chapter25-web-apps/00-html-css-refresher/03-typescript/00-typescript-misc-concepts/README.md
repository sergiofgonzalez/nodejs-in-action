# TypeScript: Misc concepts
> Assorted selection of misc concepts and examples

## Contents

### The `Partial<T>` utility type

The `Partial<Type>` constructs a type with all the properties of `Type` set to optional.

| EXAMPLE: |
| :------- |
| See [01: Hello, `Partial<T>`!](01-hello-partial/README.md) for a detailed description of the concept and a runnable example. |

### User-defined type guards and type predicates

A **type guard** is a special type of check that inspects the type of a given element (such as `typeof` and `instanceof`).

TypeScript allows you to write your own *type guards* using  functions whose return type is a **type predicate**, where a type predicate is an annotation of taking the form `parameterName is Type` where `parameterName` must be the name of a parameter from the type guard function signature.

| EXAMPLE: |
| :------- |
| See [02: Hello, user-defined type guards!](02-hello-user-defined-type-guards/README.md) for a short description of the concepts backing user defined type guards and type predicates and a runnable example illustrating those concepts. |

### Types vs. Interfaces

Types and interfaces are becoming more and more similar with the latest versions of TypeScript, but conceptually:
+ **interfaces** &mdash; a way to describe the shape/behavior of an object.
+ **type** &mdash; a definition of a type of data such as a union, primitive, intersection, tuple...

| EXAMPLE: |
| :------- |
| See [03: Types vs. interfaces sandbox](03-types-vs-interfaces-sandbox/README.md) for a brief discussion on types, interfaces and their basic capabilities and a few runnable examples. |

### CORS in action
By default, browsers prevent cross-origin requests to be performed. **CORS** is a mechanism that allows those requests to be successfully performed, but requires the server that receives the cross-origin request to send some additional HTTP headers in response to the cross-origin request.

| EXAMPLE: |
| :------- |
| See [04: Hello, CORS!](04-cors) for a detailed discussion on cross-origin requests and CORS, and runnable code to see those concepts in action. |

### Hello, WebSockets!

WebSockets is a protocol that enables a full-duplex persistent connection to be established between a client application running in the browser, and a server application.

WebSockets open a lot interesting scenarios, such as a server sending updates to a client without client requesting such information from the server (push notifications), or communicating two clients running in the browser.

| EXAMPLE: |
| :------- |
| See [05: Hello, WebSockets!](05-hello-websockets) for a runnable example illustrating how a client and a server can communicate through the WebSockets protocol. |


### Remembering EJS with Express

*EJS* is one of the most popular template engines for JavaScript. Express projects can be easily integrated with *EJS* to provide server-side rendering capabilities, in which application data can be interpolated into HTML templates.

| EXAMPLE: |
| :------- |
| See [06: Remembering *EJS*](06-remembering-ejs) for a runnable example illustrating project structure, integration, and basic usage of *EJS* in Express projects. |

### Using nodemon to configure hot-reloading your TypeScript application

[nodemon](https://github.com/remy/nodemon) is a well-known tool that helps restarting a Node.js application when file changes in a particular file or directory are detected.

However, nodemon is not readily suited for TypeScript projects, and it requires a little bit of extra work.

The example [07: Configuring Nodemon for reloading](07-nodemon-ts) shows you how to configure your `package.json` to achieve that.

### TypeScript basics refresher

TypeScript comes with a lot of *baggage* that is not needed when doing JavaScript development. It is common every now and then to refresh basic concepts when approaching a new TypeScript project (e.g. intersection types, interfaces vs. types, enums...).

The example [08: TypeScript basics sandbox](08-ts-basics-sandbox) features a set of basic exercises to refresh those basic concepts.

### TypeScript 4 features

TypeScript 4 introduced a great list of features such as:
+ variadic tuple types
+ template literal types
+ labeled tuples

The example [09: TypeScript 4 concepts](09-ts4-features) illustrates those concepts.

### Mastering conditionals

Conditionals (if, ternary operator, switch) are inherited from the JavaScript syntax and you don't typically spend much time thinking about them when writing TypeScript. However, you can write them in a more *type-safe way* by embracing the TypeScript ways.

The example [10: Mastering conditionals](10-mastering-conditionals) illustrate how to write conditionals in this way with very simple examples.

### Structural typing

Structural typing is a concept loosely related to *duck-typing*, and that becomes very important when learning TypeScript.

The example [11: TypeScript structural typing](11-ts-structural-typing) illustrates duck-typing and the basics of structural typing.

### Hello, utility types!

The TypeScript language bundles a several utility types for you to use in your application such as:
+ `Record` to describe key-value maps entry shape
+ `Partial` to create a type with all the properties of another type marked as optional
+ `Required` to create a type with all the properties of another type marked as required
+ `Pick` to create a type with specific properties of another type
+ `Omit` to create a type without specific properties of another type.

You can use the example [12: Hello, utility types!](12-hello-utility-types) to practice the utility types.

### Hello, advanced types and assertions!

TypeScript lets you create your own utility types (like `Record` and `Partial`) by using quite advanced type related concepts such as:
+ capturing property keys with `keyof`/`keyof typeof`
+ branded types for enabling nominal types for stricter type checking (disables structural typing)
+ conditional types that mutate depending on how they are instantiated.

The example [13: Hello, advanced types and assertions!](13-advanced-types-and-assertions) introduces a few examples in these concepts.

### OOP in TypeScript

TypeScript has first class support to OOP techniques, and the four pillars of OOP: encapsulation, abstraction, inheritance, and polymorphism can be used in a very clean way.

You can use the example [14: OOP refresher](14-oop-refresher) as a sandbox to practice those techniques.

## Exercises, code examples, and mini-projects

### [01: Hello, `Partial<T>`!](01-hello-partial)
Illustrates the use of the utility type `Partial<Type>` which constructs a type from another type in which all the properties are set to optional.

### [02: Hello, user-defined type guards!](02-hello-user-defined-type-guards)
Introduces the concepts of *user-defined type guards* and *type predicates* which lets you write cleaner code to understand the type of an object.

### [03: Types vs. interfaces sandbox](03-types-vs-interfaces-sandbox)
A collection of examples illustrating some simple capabilities of types and interfaces.

### [04: Hello, CORS!](04-cors)
A gentle introduction to *same-origin policy* in the browser and the *CORS* mechanism, with some simple runnable examples.

### [05: Hello, WebSockets!](05-hello-websockets)
A very simple introduction to WebSockets.

### [06: Remembering *EJS*](06-remembering-ejs)
Remembering the basic concepts of the *EJS* template engine for Express projects.

### [07: Configuring Nodemon for reloading](07-nodemon-ts)
Using nodemon to recompile and restart your TypeScript application when you make changes to your application.

### [08: TypeScript basics sandbox](08-ts-basics-sandbox)
A sandbox project to refresh basic TypeScript concepts.

### [09: TypeScript 4 concepts](09-ts4-features)
A sandbox project to introduce some TypeScript 4 concepts.

### [10: Mastering conditionals](10-mastering-conditionals)
Illustrating different ways to write conditional *in the TypeScript way*.

### [11: TypeScript structural typing](11-ts-structural-typing)
Introducing structural typing in TypeScript

### [12: Hello, utility types!](12-hello-utility-types)
Introducing TypeScript utility types: `Record`, `Partial`, `Required`, `Pic`, `Omit`...

### [13: Hello, advanced types and assertions!](13-advanced-types-and-assertions)
Introduction to the creation of your custom utility types using advanced techniques such as capturing property keys, enabling nominal types (i.e. disabling structural types), and using conditional types.

### [14: OOP refresher](14-oop-refresher)
Refreshing OOP pillars in TypeScript: abstraction, inheritance, encapsulation, and polymorphism.

## Description


## ToDo
