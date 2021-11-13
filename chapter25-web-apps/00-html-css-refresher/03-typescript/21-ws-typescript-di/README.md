# TypeScript: Chapter 21 &mdash; Workshop: Dependency Injection in TypeScript
> Dependency Injection and IoC in TypeScript

## Contents
+ The Dependency Injection (DI) design pattern
+ Quick review of DI in Angular
+ InversifyJS: an IoC container for TypeScript

## The Dependency Injection (DI) design pattern

The regular module system is a great way to organize and wire together the components of an application, but it introduces very **tight coupling** between components.

The **Dependency Injection (DI)** design pattern helps you address that coupling.

> **Dependency Injection** is a pattern in which the dependencies of a component are **provided as inputs** by an external entity, often referred to as the **injector**.

The **injector** initializes the different components and ties their dependencies together. It can can be a simple initialization script or a more sophisticated *global container* that maps all the dependencies and centralizes the wiring of all the modules of the system.

The main advantage of this approach is improved decoupling, especially evident in modules depending on stateful instances (such as db connections, etc.).

When using **DI**, each dependency, instead of being hardcoded into the module, is received from the outside. In practice, this means that the dependent module can be configured to use any compatible dependency. Therefore, the module itself can be reused in different contexts with minimal effort.

![Dependency Injection](../../../../chapter33-creational-design-patterns/images/dependency_injection.png)

The diagram above illustrates the **Dependency Injection** pattern and the different elements involved:
+ a **Service** expects a **dependency** with a predetermined **interface**.
+ an **Injector** retrieves and creates and actual concrete instance that implements such an **interface**, and passes it (*injects it*) into the ***Service***. That is, the ***Injector*** is responsible for providing an instance that fulfills the **Service** dependency.

Consider the following example involving a `UserRegistrationService` class, similar to the one that you'd find in any web application that requires users to be activated before using the site.

The skeleton of the class will be something like:

```typescript
class UserRegistrationServce {
  registerUser(email: string, password: string) {
    /*
      + process user registration (save user in durable, persistent storage)
      + send registration success notification (send email to user)
    */
  }
}
```

In order to decouple the `registerUser()` responsibilities with the actual implementation, you will want to create interfaces:

```typescript
interface User {
  email: string;
  password: string;
}

interface UserRepository {
  save(user: User): Promise<User>;
}

interface EmailService {
  sendEmail(to: string, subject: string, body?: string): Promise<void>;
}
```

With those interfaces in place, we can create the implementation of the `UserRegistrationService` without caring about the actual implementation behind `UserRepository` and `EmailService`:

```typescript
class UserRegistrationServce {
  constructor(
    private userRepository: UserRepository,
    private emailService: EmailService
  ) {}

  registerUser(email: string, password: string) {
    await this.userRepository.save({ email, password });
    await this.emailService.sendEmail(email, 'Welcome to my site!');
  }
}
```

Note that TypeScript let us use of the most fundamental design principles of OOP:
> Program to an interface, not an implementation.

On the other hand, we now need to provide an implementation for those interfaces:

```typescript
// file-user-repository.ts
import fs from 'fs';
import { User } from '../interfaces/user';
import { UserRepository } from '../interfaces/user-repository';

export class FileUserRepository implements UserRepository {
  save(user: User): Promise<User> {
    return new Promise((resolve, reject) => {
      fs.appendFile('users.txt', `${ JSON.stringify(user) }\n`, err => {
        if (err) {
          return reject(err);
        }
        resolve(user);
      });
    });
  }
}

// fake-email-service.ts
import { EmailService } from '../interfaces/email-service';

export class FakeEmailService implements EmailService {
  sendEmail(to: string, subject: string, body?: string): Promise<void> {
    console.log(
      `sending email...
      To: ${ to }
      Subject: ${ subject }
      Body:
      ${ body?? '<EOM>' }
      `);
      return Promise.resolve();
  }
}
```

Note that we're providing a simple implementation of the `UserRepository` that saves the user to file, and a completely fake implementation of the `EmailService`. No problem with that &mdash; using *DI* let us separate the *what* from the *how*. You will be able to provide more comprehensive implementations of both interfaces that saves the user to a database and sends a real email with minimum changes to your program.

Let's see how we can create a simple *injector* in our main program to wire everything together:

```typescript
import { FileUserRepository } from './services/file-user-repository';
import { FakeEmailService } from './services/fake-email-service';
import { EmailService } from './interfaces/email-service';
import { UserRepository } from './interfaces/user-repository';
import { UserRegistrationService } from './services/user-registration-service';



/* injector */
const userRepository: UserRepository = new FileUserRepository();
const emailService: EmailService = new FakeEmailService();
const userRegistrationService = new UserRegistrationService(userRepository, emailService);

userRegistrationService.registerUser('jason.isaacs@ecample.com', 'secret123');
```

The **injector** instantiates implementations of the required interfaces and passes them to the `UserRegistrationService` constructor. Once you had more comprehensive implementations of those interfaces, only those instantions would be changed and the remaining program would remain intact!


As an added benefit, testing your application becomes easier as you can implement even simpler mock instances of those dependencies:

```typescript
// test/user-registration-service.test.ts
import { EmailService } from '../src/interfaces/email-service';
import { UserRepository } from '../src/interfaces/user-repository';
import { User } from '../src/interfaces/user';
import { UserRegistrationService } from '../src/services/user-registration-service';

test('User Registration Service', async () => {
  const mockUserRepository: UserRepository = {
  // eslint-disable-next-line @typescript-eslint/no-empty-function, @typescript-eslint/no-unused-vars
    save: jest.fn( async (user: User) => user)
  };

  const mockEmailService: EmailService = {
    // eslint-disable-next-line @typescript-eslint/no-empty-function, @typescript-eslint/no-unused-vars
    sendEmail: jest.fn( async (to: string, subject: string, body?: string) => {})
  };


  const userRegistrationService = new UserRegistrationService(
    mockUserRepository,
    mockEmailService
  );

  await userRegistrationService.registerUser(
    'jason@example.com',
    '1234');

  expect(mockUserRepository.save).toHaveBeenCalled();
  expect(mockEmailService.sendEmail).toHaveBeenCalled();
});
```

In the test above, we're using *Jest* mock capabilities to provide functions that can be spied. That allows you to create very focused unit tests, in which you don't care about what the dependencies do and how they do it. The real implementations of the `UserRepository` and `EmailService` can be tested separately in their own tests.

Finally, it must be noted that *DI* is not only about providing classes. It can also be used to provide functions, objects or simple constants. For example, we can make a small enhancement in the security of our `UserRegistrationService` and encrypt the user password with a salt that we receive from the injector:

```typescript
import { EmailService } from '../interfaces/email-service';
import { UserRepository } from '../interfaces/user-repository';
import bcrypt from 'bcrypt';

export class UserRegistrationService {
  constructor(
    private userRepository: UserRepository,
    private emailService: EmailService,
    private passwordHashSalt: string
  ) {}

  async registerUser(email: string, password: string) {
    const hashedPassword = await bcrypt.hash(password, this.passwordHashSalt);
    const registeredUser = await this.userRepository.save({ email, password: hashedPassword });
    await this.emailService.sendEmail(registeredUser.email, 'Welcome to my website!');
  }
}
```

The service implementation is slightly modified to also require the salt, and then used to encrypt the password in the `registerUser` function.

Then the injector will be responsible for providing the salt:

```typescript
import { FileUserRepository } from './services/file-user-repository';
import { FakeEmailService } from './services/fake-email-service';
import { EmailService } from './interfaces/email-service';
import { UserRepository } from './interfaces/user-repository';
import { UserRegistrationService } from './services/user-registration-service';
import bcrypt from 'bcrypt';



/* injector */
async function run() {
  const userRepository: UserRepository = new FileUserRepository();
  const emailService: EmailService = new FakeEmailService();
  const salt = await bcrypt.genSalt();
  const userRegistrationService = new UserRegistrationService(userRepository, emailService, salt);

  userRegistrationService.registerUser('jason.isaacs@example.com', 'secret123');
}
```

Neither the interfaces or their implementations are affected by the change, thanks to the focused, loosely-coupled design of our program.

*DI* is closely related with another OOP design principle known as the **Inversion of Control (IoC)**. **IoC** tells you to depend about abstractions instead of actual classes, so that an external entity can decide what the actual implementation will be. In our example, the **injector** is responsible for choosing the `FileUserRepository` and `FakeEmailService` as the actual implementations that are wired into the `UserRegistrationService`. Everything works thanks to the fact that `UserRegistrationService` depends about abstractions &mdash; namely the `UserRepository` and `EmailService` interfaces rather than in actual implementations.

### DI in Angular

Angular has its own implementation of DI. This section illustrates how the Angular framework, as well as the apps built on it, use this DI implementation.

An Angular app is made up of several `NgModule`, each of which is a logical part of an app. Each module can be a feature, an UI component library, etc.

Each `NgModule` can have two types of things:
+ Declarations (`Component` and `Directive`)
+ Providers (usually `Service`)

Declarations constitute the UI of the app as seen on the snippet below:

```typescript
import { Component, Input } from '@angular/core';

@Component({
  selector: 'welcome-message',
  template: `
    <h1>Welcome {{ name }}!</h1>
    `
})
export class WelcomeMessageComponent {
  @Input() name: string;
}
```

Providers are usually services, which hold the main logic of the app. For example, the following snippet fetches a list of users from a backend:

```typescript
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

export interface User {
  name: string;
}

@Injectable()
export class UsersService {
  getUsers(): Observable<User[]> {
    return of([
      { name: 'Alice' },
      { name: 'Bob' },
      { name: 'Charlie' }
    ]);
  }
}
```

Once defined, the `UsersService` can be used in our `UsersList` component, to display the users in a list:

```typescript
import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { UsersService, User } from './users.service';

@Component({
  selector: 'users-list',
  template: `
    <ul>
      <li *ngFor="let user of (users$ | async)">
        {{ user.name }}
      </li>
    </ul>
  `
})
export class UsersListComponent {
  readonly users$: Observable<User[]>;

  constructor(private usersService: UsersService) {
    this.users$ = usersService.getUsers();
  }
}
```

Angular will be responsible for injecting the `UsersService` instance as required. By doing so we would get all the benefits we previously discussed about DI.

Angular providers can also require other providers. In the snippet below we have the `UsersService` making use of an `HTTPClient` class from Angular, so that we retrieve the users by way of an HTTP call:

```typescript
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface User {
  name: string;
}

@Injectable()
export class UsersService {
  constructor(private httpClient: HttpClient) {}

  getUsers(): Observable<User[]> {
    return this.httpClient.get<User[]>('/api/users');
  }
}
```

## InversifyJS

[InversifyJS](https://github.com/inversify/InversifyJS) is an implementation of an IoC container for TypeScript and JavaScript applications.

The basic idea in InversifyJS is to have one place that defines all the concrete implementations of functionality, while the rest of the app only depends on abstractions (interfaces).

| EXAMPLE: |
| :------- |
| See [02: Hello, InversifyJS!](02-hello-inversifyjs)
illustrates how to set up and work with InversifyJS with the most basic of examples. for a runnable example. See also [e01: Hello, DI using InversifyJS!](e01-hello-di-with-inversifyjs), [e02: Hello, DI using InversifyJS! (Variant 2)](e02-hello-di-with-inversifyjs-main), and
[e03: Hello, DI using InversifyJS! (Variant 3)](e03-hello-di-with-inversifyjs-main-bcrypt). |

## You know you've mastered this chapter when...
+ You're familiar with the *Dependency Injection* design pattern, and the problems it solves.

+ You recognized the main elements of the *DI* design pattern: interfaces, services, and injector.

+ You know how to make a basic manual implementation of the *DI* pattern.

+ You understand the *Inversion of Control (IoC)* design principle.

+ You understand at a high-level *DI* in Angular.

+ You're comfortable using *InversifyJS* as an *IoC* container for your JavaScript projects.

## Exercises, code examples, and mini-projects

### [01: Hello, DI!](01-hello-di)
Illustrates a custom implementation of the **DI** pattern and the benefits it brings.

### [02: Hello, InversifyJS!](02-hello-inversifyjs)
Illustrates how to set up and work with InversifyJS with the most basic of examples.

### [e01: Hello, DI using InversifyJS!](e01-hello-di-with-inversifyjs)
Reworking the [01: Hello, DI!](01-hello-di) example using InversifyJS.

### [e02: Hello, DI using InversifyJS! (Variant 2)](e02-hello-di-with-inversifyjs-main)
A small variant on [e01: Hello, DI using InversifyJS!](../e01-hello-di-with-inversifyjs) in which `UserRegistrationService` is no longer the *main* class of the composition root.

### [e03: Hello, DI using InversifyJS! (Variant 3)](e03-hello-di-with-inversifyjs-main-bcrypt)
A small variant on [e02: Hello, DI using InversifyJS! (Variant 2)](../e02-hello-di-with-inversifyjs-main) in which `UserRegistrationService` is enhanced with password hashsing capabilities.

## ToDo
