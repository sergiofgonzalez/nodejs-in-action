# TypeScript: Chapter 14 &mdash; Express
> Express development with TypeScript

## Contents

+ A quick tour of Express
+ Building an Express-based web server
+ Building a functional Express app

## Hello, Express!!

This section explores how to build the simplest web server. Then you'll learn about routes, and how to split the code base into modules for ease of maintenance and readability.

Finally, you'll learn about how to set the necessary configuration parameters for your Express application.

| NOTE: |
| :---- |
| Author's way of doing things with Express and Node.js. You might find other approaches in the [Exercises, code examples, and mini-projects](#exercises-code-examples-and-mini-projects) section. |

### Express setup

The setup of an *Express* application in TypeScript consists in taking the basic TypeScript project startr and just add the following dependencies for *Express* and its types:

```bash
npm install --save express
npm install --save-dev @types/express
```

Then you can create your first Express HTTP server:

```typescript
import express from 'express';

const app = express();

app.get('/', (req: express.Request, res: express.Response) => {
  console.log(`request URL: `, req.url);
  res.send(`Hello, Express!!`);
});

app.listen(3000, () => {
  console.log(`HTTP server listening on port 3000`);
});
```

Note that the only interesting part is that the `req` and `res` parameters are typed as `express.Request` and `express.Response` respectively.

| EXAMPLE: |
| :------- |
| See [01: Hello, *Express* in TypeScript!!](01-hello-express-ts) for a runnable example. |

### Express router
The **Express Router** object is intended to help organize applications that might have hundreds of endpoints. It would quickly become a nightmare to specify all those routes in a single file.

Using a *Router* object can be used to split these routes into separate files. For example, you can have the user sign-in/sign-off endpoints in one file, the `products/` related endpoints in another file and so on.

In order to use the *Router* you just have to follow these simple steps:

+ Create a directory `routes/` within your application, and place your endpoint declarations as shown in the examples below:

```typescript
// app/src/routes/index.ts
import express from 'express';

const router = express.Router();

router.get('/', (req: express.Request, res: express.Response) => {
  res.send(`Index module processed ${ req.url }`);
});

export { router };
```

```typescript
// app/src/routes/login.ts
import express from 'express';

const router = express.Router();

router.get('/login', (req: express.Request, res: express.Response) => {
  res.send(`Login module processed ${ req.url }`);
});

export { router };
```


+ Import the routers exported from the corresponding module and register them as *route handlers* (using `app.use()` as seen in the example below):

```typescript
// app/src/main.ts
import express from 'express';
import * as Index from './routes/index';
import * as Login from './routes/login';

export const app = express();

app.use('/', Index.router);
app.use('/', Login.router);

export const server = app.listen(3000, () => {
  console.log(`HTTP server listening on port 3000`);
});
```

| EXAMPLE: |
| :------- |
| See [02: Express &mdash; Hello, *Express Router* in TypeScript!!](02-hello-express-router-ts) for a runnable example. |

### Express configuration

You can use configuration handling modules such as [`dotenv`](https://www.npmjs.com/package/dotenv) to handle your configuration needs.

For example, to use `dotenv` you just have to do:

```bash
# types come packaged within the module
npm install dotenv
```

And update your `main.ts` file so that it bootstraps the configuration handling:

```typescript
import express from 'express';
import dotenv from 'dotenv';
import * as Index from './routes/index';
import * as Login from './routes/login';

enum ConfigOptions {
  PORT = 'PORT'
}

dotenv.config(); // bootstrap configuration
export const app = express();

app.use('/', Index.router);
app.use('/', Login.router);


let port = 3000;

if (process.env[ConfigOptions.PORT]) {
  port = Number(process.env[ConfigOptions.PORT]);
} else {
  console.log(`No port config was found using default port:`, port);
}

export const server = app.listen(port, () => {
  console.log(`HTTP server listening on port ${ port }`);
});
```

| NOTE: |
| :---- |
| See how the author defined an *enum* to create a sort of *typesafe* configuration for the properties names. In my opinion, it's a bit of an overkill and it complicates a bit the readability of `process.env` accesses. |

| EXAMPLE: |
| :------- |
| See [03: Express &mdash; Hello, configuring *Express* with `dotenv` in TypeScript!!](03-hello-express-config-dotenv-ts) for a runnable example. |

## An Express application

In this section you will build a basic *Express* application with two pages that handles user login via a form.

### Express templating

### Handlebars configuration

### Using templates

### Static files

### Express forms

### Express session data and redirects

## Summary


## You know you've mastered this chapter when...

+ You have some basic ideas about the *Angular framework*

## Exercises, code examples, and mini-projects

### [01: Hello, *Express* in TypeScript!!](01-hello-express-ts)
First express server and sample test spec to illustrate how to use *Express* in a TypeScript project.

### [02: Express &mdash; Hello, *Express Router* in TypeScript!!](02-hello-express-router-ts)
A simple *Express server* using the *Router* object to split endpoint declaration across multiple files.

### [03: Express &mdash; Hello, configuring *Express* with `dotenv` in TypeScript!!](03-hello-express-config-dotenv-ts)
A simple *Express server* in which `dotenv` module to handle configuration is enabled.

## ToDo
- [ ] Add more serious Jest based tests for Express applications (review blog on correctly testing Express apps)
- [ ] Review Microsoft starter on Express: how is the structure for routes? is Router used?
- [ ] Create template with the whole 9-yards (pino, middleware, etc.)
- [ ] Check the recommended way to bootstrap dotenv.
