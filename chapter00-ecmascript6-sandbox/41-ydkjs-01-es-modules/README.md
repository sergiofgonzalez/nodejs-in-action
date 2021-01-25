# You don't Know JavaScript &mdash; 01: Get Started
## 41 &mdash; ES Modules
> A quick refresher on ES Modules

### ES Modules and Node.js CommonJS modules
ES modules are the official standard format to package JavaScript code for reuse. Modules are defined using a variety of `import` and `export` statements.

Node.js already fully supports ES modules, but provide limited interoperability between this standard module definition and CommonJS.

In order to use this module definition you either have to use the extension `.mjs` or `.js` and provide the nearest `package.json` with a top-level field `"type": "module"`.

Also, in your `.eslintrc.yml` file, you have to enable the module source type:

```yml
...
parserOptions:
  ecmaVersion: 2018
  sourceType: module
...
```

### ES Modules
In the example we illustrate how to create a couple of interrelated modules `publication` and `blogpost`.

Note that in order to import them in Node.js you have to use the full path:

```javascript
import { create as newBlogPost } from './blogpost.mjs';
```

The keyword `import` is used to bring modules into the current context. The keyword `export` is used to expose certain bindings from a module for other consumers.

The way to organize JavaScript programs into modules consists of creating one file per module. 

Then, you need to be aware ES modules are singletons, in that there's only one instance ever created, at first `import`. If your module requires multiple instantiations, it has to be controlled from the module itself.
A way to do that is illustrated in the examples, by exposing a public API from the function being exported:

```javascript
import { create as createPub } from './publication.mjs';

function printDetails(pub, URL) {
  pub.print();
  console.log(URL);
}

export function create(title, author, pubDate, URL) {
  const pub = createPub(title, author, pubDate);

  const publicAPI = {
    print() {
      printDetails(pub, URL);
    }
  };

  return publicAPI;
}
```

Lastly, the `as` clause is used to rename an import for readability purposes.

## You don't know JS Examples
All the examples in this section are taken from https://github.com/getify/You-Dont-Know-JS.
Especifically, this example is based on [ES Modules](https://github.com/getify/You-Dont-Know-JS/blob/2nd-ed/get-started/ch2.md#es-modules).

