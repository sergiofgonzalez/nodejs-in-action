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

The first step consists in setting up a templating engine for the Express application. You will be using [Embedded JavaScript templates (*EJS*)](https://www.npmjs.com/package/ejs) but there are many other options.

When using *EJS* you can create your HTML pages using some specific syntax that lets you mix HTML elements with JavaScript logic and bindings.

In your simple case, we will be *binding* variables used in our Express application to certain *expressions* used in our HTML pages as seen below:

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <title><%= title %></title>
  </head>
  <body>
    <header>
      <h1><%= welcomeMsg %></h1>
    </header>
  </body>
</html>
```

See how the binding is being done via `<%= title %>` and `<%= welcomeMsg %>` expressions. That will have the effect of displaying the *escaped output* of the variables `title` and `welcomeMsg` replacing the `<%= >` tags.

Then, you will find to add [*EJS*](https://www.npmjs.com/package/ejs) as a dependency:

```bash
npm install --save ejs
```

And tell *Express* that you want to use *EJS* as the templating engine, and where you're going to place the views:

```typescript
// app/src/main.ts
import express from 'express';
import dotenv from 'dotenv';
import path from 'path';
import * as Index from './routes/index';
import * as Login from './routes/login';


dotenv.config(); // bootstrap configuration
export const app = express();


/* templating engine setup */
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
```
In your case, you will be placing the views in `app/src/views/`. As a result, you will need to create a script that copies that directory from `app/src/views/` to `dist/` so that is found in the final transpiled source code.

That can easily be achieved using modules such as [`shelljs`](https://www.npmjs.com/package/shelljs).

First you add `shelljs` to the list of development dependencies:

```bash
npm install --save-dev shelljs @types/shelljs ts-node
```

| NOTE: |
| :---- |
| [`ts-node`](https://www.npmjs.com/package/ts-node) provides a TypeScript execution environment. You will use it to run a TypeScript file directly from your command line. |

And then create a simple script that performs the copy:

```typescript
// scripts/copy-static-assets.ts
import * as shell from 'shelljs';

shell.cp('-R', 'app/src/views', 'dist/');
```

Finally, you wire it in the build process updating your `package.json`:

```json
"scripts": {
...
  "copy-static-assets": "ts-node scripts/copy-static-assets.ts",
...
  "build": "npm run lint && node_modules/.bin/tsc && npm run copy-static-assets",
...
}
```

Note that we're invoking the `copy-static-assets.ts` TypeScript program using `ts-node` with no further configuration.

### Using templates

Now, you're ready to create our first template:

```html
<!-- app/src/views/index.ejs -->
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <title><%= title %></title>
  </head>
  <body>
    <header>
      <h1><%= welcomeMsg %></h1>
    </header>
  </body>
</html>
```

The final step consists in modifying the index route handler, so that it sends those values:

```typescript
// app/src/routes/index.ts
import express from 'express';

const router = express.Router();

router.get('/', (req: express.Request, res: express.Response) => {
  console.log(`Processing request in Index module for `, req.url );
  res.render('index',
    {
      title: 'Express app',
      welcomeMsg: 'Hello to Jason Isaacs from an Express app'
    }
  );
});

export { router };
```

At this point, you will be able to start the Express app, and it will work, but you will find some errors related to the CSS and favicon not being retrieved. This is because you haven't configured the static file handling yet.

| EXAMPLE: |
| :------- |
| See [04: Express &mdash; Hello, *Express* templating with `ejs` in TypeScript!!](04-hello-express-templating-ejs-ts) for a runnable example. |

### Static files

The next step consists of making the necessary additions so that static resources intended to be run on the browser are correctly served by our Express app.

As a side effect, this will allow us to improve our views to reference images, fonts, CSS files, etc.

In order to enable serving static files, you just have to register the `express.static()` middleware passing the location where you intend to place the static resources:

```typescript
// app/src/main.ts
import express from 'express';
import dotenv from 'dotenv';
import path from 'path';
import * as Index from './routes/index';
import * as Login from './routes/login';


dotenv.config(); // bootstrap configuration
export const app = express();


/* templating engine setup */
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

/* route declarations */
app.use('/', Index.router);
app.use('/', Login.router);

/* serving static files enablement */
process.env.STATIC_RESOURCES_PATH = path.join(__dirname, process.env.PUBLIC_STATIC_RESOURCES_PATH ?? 'public');
app.use(express.static(process.env.STATIC_RESOURCES_PATH));

const port = process.env.PORT ?? 3000;

export const server = app.listen(port, () => {
  console.log(`HTTP server listening on port ${ port }`);
});
```

Note that we allow the location of static resources to be configured, and otherwise we will use the `app/src/public/` directory.

Once enabled, we can update the view:

```html
<!-- app/src/views/index.ejs -->
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <title><%= title %></title>
    <link rel="shortcut icon" href="images/favicon.ico" type="image/x-icon">
    <link href="stylesheets/styles.css" rel="stylesheet">
    <script src="ts/app.js" type="module" defer></script>
  </head>
  <body>
    <header>
      <h1><%= welcomeMsg %></h1>
    </header>
  </body>
</html>
```

See how you can now include links to a favicon, stylesheets, and JavaScript...

| EXAMPLE: |
| :------- |
| See [05: Express &mdash; Hello, *Express* static file serving in TypeScript!!](05-hello-express-static-files) for a runnable example. |

### Express forms

In this section, you will create a `login.ejs` template that will be used from the login handler when a POST request is received.

Let's start with the template:

```html
<!-- app/src/views/login.ejs -->
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <title><%= title %></title>
    <link rel="shortcut icon" href="images/favicon.ico" type="image/x-icon">
    <link href="stylesheets/styles.css" rel="stylesheet">
    <link href="stylesheets/bootstrap.min.css" rel="stylesheet">
    <script src="ts/app.js" type="module" defer></script>
  </head>
  <body>
    <header>
      <h1>Login</h1>
    </header>
    <main>
      <form method="POST">
        <p><%= errorMessage %></p>
        <p>
          Username: <input name="username">
        </p>
        <p>
          Password: <input name="password" type="password">
        </p>
        <button type="submit" class="btn btn-primary">Login</button>
      </form>
    </main>
  </body>
</html>
```

The relevant difference with the other template is that this one features a basic form. Note that it uses template bindings for the `title` and `errorMessage`, so those will be the pieces of information that you will need to send from your Express app.

You will now need to update the handler for the `login/` route as it will need to respond to an initial HTTP GET request to show the form, and a subsequent HTTP POST request to process the form after the user has populated the fields and clicked on the submit button.

```typescript
// app/src/routes/login.ts
import express from 'express';

const router = express.Router();

router.get('/login', (req: express.Request, res: express.Response) => {
  res.render('login', { title: 'Express Login', errorMessage: null });
});

router.post('/login', (req: express.Request, res: express.Response, next: express.NextFunction) => {
  console.log(`req.body.username:`, req.body.username);
});

export { router };
```

Note that for now, the handling of the form consists in displaying on the server console the username received in the request.

Finally, you need to wire the necessary middleware to handle non-empty request in our Express app.

```typescript
// app/src/main.ts
import express from 'express';
import dotenv from 'dotenv';
import path from 'path';
import * as Index from './routes/index';
import * as Login from './routes/login';


dotenv.config(); // bootstrap configuration
export const app = express();


/* templating engine setup */
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

/* middleware setup */
process.env.STATIC_RESOURCES_PATH = path.join(__dirname, process.env.PUBLIC_STATIC_RESOURCES_PATH ?? 'public');
app.use(express.static(process.env.STATIC_RESOURCES_PATH));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

/* route declarations */
app.use('/', Index.router);
app.use('/', Login.router);

const port = process.env.PORT ?? 3000;

export const server = app.listen(port, () => {
  console.log(`HTTP server listening on port ${ port }`);
});
```

Note that the `express.json()` and `express.urlencoded()` middleware have to be placed before the route declarations. Otherwise, that functionality will not affect them.

| EXAMPLE: |
| :------- |
| See [06: Hello, *Express* form management in TypeScript!!](06-hello-express-form-management) for a runnable example. |

### Express session data and redirects

In this section, you will wrap up our Express app with a few additional capabilities.

First of all, we will use the `express-session` module to persist pieces of data, such as the username, across screens. A session object will be bound to the request object in order to do that.

## Summary


## You know you've mastered this chapter when...

+ You have some basic ideas about the *Angular framework*

## Exercises, code examples, and mini-projects

### [01: Hello, *Express* in TypeScript!!](01-hello-express-ts)
First express server and sample test spec to illustrate how to use *Express* in a TypeScript project.

### [02: Hello, *Express Router* in TypeScript!!](02-hello-express-router-ts)
A simple *Express server* using the *Router* object to split endpoint declaration across multiple files.

### [03: Hello, configuring *Express* with `dotenv` in TypeScript!!](03-hello-express-config-dotenv-ts)
A simple *Express server* in which `dotenv` module to handle configuration is enabled.

### [04: Hello, *Express* templating with `ejs` in TypeScript!!](04-hello-express-templating-ejs-ts)
A simple *Express server* in which `ejs` is used as the templating engine for HTML pages.

### [05: Hello, *Express* static file serving in TypeScript!!](05-hello-express-static-files)
A simple *Express server* in which serving static files is enabled on top of the previous example.

### [06: Hello, *Express* form management in TypeScript!!](06-hello-express-form-management)
A simple *Express server* in which form management is illustrated.

## ToDo
- [ ] Add more serious Jest based tests for Express applications (review blog on correctly testing Express apps)
- [ ] Review Microsoft starter on Express: how is the structure for routes? is Router used?
- [ ] Create template with the whole 9-yards (pino, middleware, etc.)
- [ ] Check the recommended way to bootstrap dotenv.
- [ ] Add serving the favicon from the Express app for the Express views
- [ ] Using bootstrap from node_modules
