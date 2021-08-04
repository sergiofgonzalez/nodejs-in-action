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

### Express router
417

### Express configuration

## An Express application

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

### [01: Hello, *Angular*!](01-hello-angular-app)
Illustrates the result of creating new *Angular* application with *Angular CLI*.
