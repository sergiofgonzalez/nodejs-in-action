# 03: *Async/Await* in TypeScript &mdash; Hello, NestJS!
> introducing NestJS framework, fully featured framework for TypeScript Node.js applications

## Exercise 13.08

NestJS is a highly opinionated and fully featured framework for building TypeScript applications. NestJS can be used to quickly bootstrap an application as it provides out-of-the-box support for middleware, GraphQL, and websockets. It also comes with ESLint, a dependency injection framework, a test framework, etc.

In this exercise we will create a simple NestJS application, validate that it starts correctly. Explore the project structure that was created, and perform a few modifications.

### Creating the project

NestJS comes bundled with a CLI application that can be invoked to create new projects: `npx @nestjs/cli new APP_NAME`

For example, to create a new project named `hello-nestjs` you'd type:

```bash
npx @nestjs/cli new hello-nestjs
```

It will ask you about the package manager you want to use, and install all the dependencies for you. It will also configure your TypeScript project adequately, and integrate it with industry standard tooling such as Jest, ESLint, Prettier, etc.

Once the initialization process is completed, a new directory `hello-nestjs` will have been created with the following structure:

```
hello-nestjs/                       <- NestJS project root
├── dist/                           <- Transpiled code
├── node_modules/                   <- Project deps
├── src/                            <- Project source code
│   ├── app.controller.spec.ts      <- test for app controller component
│   ├── app.controller.ts           <- app controller component src code
│   ├── app.module.ts               <- app module src code
│   ├── app.service.ts              <- app service src code
│   └── main.ts                     <- app entry point (bootstrap)
├── test/                           <- end-to-end tests
├── eslintrc.js                     <- ESLint configuration
├── .gitignore                      <- Git ignored patterns
├── .prettierrc                     <- Prettier configuration
├── nest-cli.json                   <- NestJS CLI configuration
├── package-lock.json               <- Package lock
├── package.json                    <- Package JSON
├── README.md                       <- Generated README.md
├── tsconfig.build.json             <- TS Config build
└── tsconfig.json                   <- TS Config
```

As you can see, the framework imposes certain architecture to your project and makes you structure your application in terms of:
+ modules
+ controllers
+ services

### Testing what is there!

The project itself is bootstrapped from `src/main.ts`. If you review the source code, you will see that NestJS completely hides the fact that Express is running behind the scenes.

You can immediately run: `npm test` to validate that your application passes all the tests.

You can start your application right away doing:

```bash
npm run start:dev
```

This will start the NestJS project in watch mode, using very efficient methods to make it lightning fast!

### Customizing the project 
As an exercise you can try to modify the initial project by creating a greeter application like the one from [02: Hello, Express!](../02-hello-express)

These are the steps to follow:
+ Update the service so that it receives a name parameter. In the service, print a personalized message using the received name, and also, include code to write the `names.txt` file in which all the names received will be appended (note: in this case we don't care about whether the name is empty or not).
+ Update the controller so that it receives the `name` query parameter (Hint: you have to use the `@Query` annotation). Set the default value of this parameter to `world` so that `Hello, world!` is displayed if no such query parameter is sent.
+ Update the test `app.controller.spec.ts` so that it correctly works after the changes. Verify that `npm test` throws no errors.
