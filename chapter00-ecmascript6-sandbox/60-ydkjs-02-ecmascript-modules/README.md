# You don't Know JavaScript &mdash; 02: Scope and Closures
## 60 &mdash; ECMAScript Modules
> Practising ECMAScript modules

### Intro
### Modern ES Modules (ESM/ECMAScript Modules)

ECMAScript modules are the official standard format to package JavaScript code for reuse, and it shares several similarities with the CommonJS format:
+ ECMAScript modules are file based
+ ECMAScript modules are singletons

#### A few simple notes on ECMAScript Modules support in Node.js
At the time of writing, Node.js v14.1.0 provides experimental support for ECMAScript modules, but it is enabled by default.

Despite being able to use ECMAScript modules right away in browser-based JavaScript, ECMAScript modules require special treatment in Node.js projects. Namely, in order to use ECMAScript modules in Node.js you will have to:
+ Use module files ending in `.mjs`.
+ Use module files ending in `.js` but have the nearest `package.json` file contains a top-level field `"type": "module"`.

Node.js will treat as CommonJS all other forms of input such as `.js` files when the nearest `package.json`file contains no top-level `"type": "module"`.

It is recommended (in sake of visibility) to make explicit whether CommonJS or ECMAScript modules are being used by:
+ Specifying `.mjs` for ECMAScript modules, and `.cjs` for CommonJS modules.
+ Use explicit `"type": "module"` for ECMAScript modules and `"type": "commonjs"` for CommonJS.

### Exporting from ECMAScript Modules
The `defineStudent` module used in previous examples, can be accommodated as an ECMAScript module as follows:

```javascript
export { getName };

var records = [
  { id: 14, name: 'Jason', grade: 86 },
  { id: 73, name: 'Ellen', grade: 87 },
  { id: 112, name: 'Idris', grade: 75 },
  { id: 6, name: 'Selma', grade: 91 }
];

function getName(studentID) {
  var student = records.find(student => student.id == studentID);
  return student.name;
}
```

Note how the statement `export { getName }` statement is used to export the module's public API. That statement can appear anywhere throughout the file, but it must be used at the top-level scope (not allowed inside any other block or function).

ECMAScript offers a fair bit of variation on how the `export` statement can be used:

```javascript
/* this fails in Node.js with the requested module does not provide an export named 'default' */
export function getName(studentID) {
//...
}
```

The previous statement declares a function that also happens to be exported.

Another allowed variation is:

```javascript
export default function getName(studentID) {
  //...
}
```
This is a so-called *default export*, which has different semantics from other exports. In essence, a *default export* is a shorthand for consumers of the module when they `import`. By contrast, non-default exports are referred as *named exports*.

### Importing from ECMAScript Modules
The `import` keyword must be used only at the top level of an ECMAScript module, outside of any blocks or functions.

The first variant is called *named import*:

```javascript
import { getName } from './lib/define-student.mjs'; // exported as `export { getName };`
getName(73); // Ellen
```

This variant imports only the specifically named public API members from the given module, and it adds those to the top-level scope of the current module.

Note that several members can be imported in the same statement:

```javascript
import { m1, m2 } from './path/to/module.mjs';
```

A named import can be renamed with the as keyword:

```javascript
import { m1 as member1, m2 as member2 } from './path/to/module.mjs';
```

If a given member is a *default export* you can drop the `{}` around the import binding:

```javascript
import member from './path/to/module.mjs'; // exported as export default m;
```

You can import both default and non-default members in one shot:
```javascript
import { default as member1, m2 as member2 } from './path/to/module.mjs';
```

By contrast, the other major variation is the *namespace import*:
```javascript
import * as Student from './path/to/module.mjs';
```

That will import the default and all the named exports, and will store everything under the single namespace identifier `Student`.




## You don't know JS Examples
All the examples in this section are taken from https://github.com/getify/You-Dont-Know-JS, book 2 on [Scopes & Closures](https://github.com/getify/You-Dont-Know-JS/tree/2nd-ed/scope-closures).

Especifically, the summary and examples are based on the section [Using Closures](https://github.com/getify/You-Dont-Know-JS/blob/2nd-ed/scope-closures/ch7.md#chapter-7-using-closures) section.