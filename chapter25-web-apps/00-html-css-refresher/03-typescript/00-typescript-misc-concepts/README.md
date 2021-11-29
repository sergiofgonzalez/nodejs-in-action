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

## ToDo
