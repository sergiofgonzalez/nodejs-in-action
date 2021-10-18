# TypeScript: Chapter 18 &mdash; Workshop: Interfaces and inheritance in TypeScript
> first steps into classes, interfaces and objects

## Contents

## Interfaces

Interfaces enables you to strongly type your objects. Interfaces are contracts that govern structure, but not functionality &mdash; they shape your objects.

Here's an example of an interface that defines the shape of a user object. It includes both data properties and methods the user objects must have:

```typescript
interface IUser {
  email: string;
  token: string;
  resetPassword: () => boolean;
}
```

Here's an snippet illustrating an object that implements that interface:

```typescript
const user: IUser = {
  email: 'jason.isaacs@example.com',
  token: '1234',
  resetPassword(): boolean {
    return true;
  }
};
```

But the annotation does not have to be explicit. Making the type annotation would help the IDE and the reader, but it is not strictly necessary:

```typescript
const sayHello = (user: IUser) => {
  console.log(`Hello, ${ user.email }!`);
};

const user = {
  email: 'jason.isaacs@example.com',
  token: '1234',
  resetPassword(): boolean {
    return true;
  }
};

sayHello(user); // OK, even without explicit typing
```

Note however, that you won't be able to invoke the function if the object passed as an argument does not comply with the contract of the interface.

```typescript
const sayHello = (user: IUser) => {
  console.log(`Hello, ${ user.email }!`);
};

sayHello({ email: `email@example.com` }); // ERROR: argument to assignable to IUser
```

### Interfaces for function signatures

TypeScript allows you to define interfaces to strongly type function definitions. The syntax mimics how the function definition would look like in a class definition, minus the function name, which is not given:

```typescript
interface SayHelloFunctionInterface {
  (user: IUser): void;
}

const sayHello = (user: IUser) => {
  console.log(`Hello, ${ user.email }!`);
};
```

### Classes implementing interfaces

One of the most common use cases for interfaces is to provide classes an interface they have to implement:

```typescript
class User implements IUser {
  email: string;
  token: string;

  constructor(args: IUser) {
    this.email = args.email;
    this.token = args.token;
  }

  resetPassword(): boolean {
    return true;
  }
}
```

When making use of this feature, instantiation of objects becomes less verbose, as you can use `new` to both instantiate and type your objects:

```typescript
const user = new User(...);
```

### Notes on interfaces

TypeScript also allows you to use the `','` as property separator for interfaces, so that the following will be also valid:

```typescript
interface IUser {
  email: string,
  token: string,
  resetPassword: () => boolean
}
```

It is also interesting to note that when implementing classes, you don't need to be strict with the function interfaces.

For example, this will work:

```typescript
interface UserClassInterface {
  user: IUser;
  makeUser(user: IUser): IUser;
}

class User implements UserClassInterface {
  user: IUser;

  constructor(user: IUser) {
    this.user = user;
  }

  makeUser(): IUser {
    return this.user;
  }
}

const myUser: IUser = {
  email: 'admin@example.com',
  token: '1234',
  resetPassword: function (): boolean {
    return true;
  }
};

const user = new User(myUser); // OK: even if makeUser is (void): IUser instead of (user: IUser): IUser
```

| NOTE: |
| :---- |
| More information on the previous use case in https://github.com/Microsoft/TypeScript/wiki/FAQ#why-are-functions-with-fewer-parameters-assignable-to-functions-that-take-more-parameters. |



## Inheritance in TypeScript


## You know you've mastered this chapter when...

## Exercises, code examples, and mini-projects

### [01: Building your first class](01-hello-class)
First steps into classes and objects with TypeScript.

## ToDo

