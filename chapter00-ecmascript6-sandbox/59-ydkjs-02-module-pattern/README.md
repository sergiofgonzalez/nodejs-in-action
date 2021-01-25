# You don't Know JavaScript &mdash; 02: Scope and Closures
## 59 &mdash; The Module Pattern
> A discussion on building modules using a custom way, and CommonJS modules.

### Intro
Lexical scope and closures are key in properly structuring and organizing code.

### Encapsulation and the Principle of Least Exposure (POLE)
Encapsulation is the bundling or co-location of information (data) and behaviors (functions) that together serve a common purpose. Closely related with encapsulation is the control of visibility of certain aspects of the encapsulated data and functionality. This can be effectively implemented through the mechanisms of lexical scope.

### Defining a Module
A module is a collection of related data and functions, characteried by a division between hidden *private* details and *public* accessible detaiils, usually called the *"public API"*.

### Namespaces

JavaScript lets you group a set of related functions together, without data in a namespace. Note that you won't experience full encapsulation using this, but it is a good practice, as you have gathered state-indepedent functions together.

```javascript
var utils = {
  cancelEvt() {
    evt.preventDefault();
    evt.stopPropagation();
    evt.stopImmediatePropagation();
  },

  wait(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  },

  isValidEmail(email) {
    return /[^@]+@[^@.]+\.[^@.]+/.test(email);
  }

};
```

### Data Structures
Data structures allow you to group data and functions together, but with not visibility control:

```javascript
var Student = {
  records: [
    { id: 14, name: 'Jason', grade: 86 },
    { id: 73, name: 'Ellen', grade: 87 },
    { id: 112, name: 'Idris', grade: 75 },
    { id: 6, name: 'Selma', grade: 91 }
  ],
  getName(studentID) {
    var student = this.records.find(student => student.id == studentID);
    return student;
  }
};

Student.getName(73);
```

Note that `Student.records` is available for clients of the data structure, so it is not a module.


### Modules
To embody the full spirit of the module pattern, we need to go one step beyond the data structures approach and provide access control to differentiate private vs. public elements.

Let's consider the following piece of code, originally referred as the *revealing module*;
```javascript
var Student = (function defineStudent(){
  var records = [
    { id: 14, name: 'Jason', grade: 86 },
    { id: 73, name: 'Ellen', grade: 87 },
    { id: 112, name: 'Idris', grade: 75 },
    { id: 6, name: 'Selma', grade: 91 }
  ];

  var publicAPI = {
    getName
  };

  return publicAPI;


  function getName(studentID) {
    var student = records.find(student => student.id == studentID);
    return student.name;
  }
})();

Student.getName(73); // Ellen
```

`Student` is now an instance of a module. It features a public API with a single method `getName(...)` which is able to access the privde hidden data (`records`) while the users of the module cannot.

The mechanisms for the module definition are as follows:
+ A function `defineStudent()` is written and immediately invoked (IIFE).
+ The IIFE returns an object named `publicAPI` containing references to the public elements of the module (`getName(...)`).
+ From the outside, `Student.getName()` invokes the exposed inner function, which has closed over the private data (`records`).
+ By virtue of how lexical scope works, variables and functions inside the module are private to consumers.

| Note: |
| :---- |
| This approach using an IIFE implies that only a single instance of the module is ever created &mdash; that is, it is a singleton. |


In summary, the previous approach is a full-fledged module as:
+ There is an outer scope, typically from a module factory function that runs at least once.
+ The module's inner scope has at least one piece of hidden information representing the state of the module.
+ The module returns on its public API a reference to at least one function that has closure over the hidden module state.

### Module Factories

The previous approach can be slightly modified to support multiple instances of the object returned by the module:

```javascript
function defineStudentFactory() {
  var records = [
    { id: 14, name: 'Jason', grade: 86 },
    { id: 73, name: 'Ellen', grade: 87 },
    { id: 112, name: 'Idris', grade: 75 },
    { id: 6, name: 'Selma', grade: 91 }
  ];

  var publicAPI = {
    getName
  };

  return publicAPI;


  function getName(studentID) {
    var student = records.find(student => student.id == studentID);
    return student.name;
  }
}

var defineStudent = defineStudentFactory();
defineStudent.getName(73); // Ellen
```

In this case, instead of an IIFE, we define a normal standalone function that returns an object with a reference to `getName(...)`, which closes over `record`.

| NOTE: |
| :---- |
| This pattern is known as the *module factory* function. |

### Module Traits
In summary, independently of whether we use the IIFE or the *module factory function* approach, we can see that in a module:

+ There is an outer scope, typically from a module factory function that runs at least once.
+ The module's inner scope has at least one piece of hidden information representing the state of the module.
+ The module returns on its public API a reference to at least one function that has closure over the hidden module state.

### Node CommonJS Modules

Node.js CommonJS modules are file-based rather than function-based:

```javascript
module.exports.getName = getName;

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

To expose something on the public API, you add a property to the empty object provided as `module.exports`.

| NOTE: |
| :---- |
| In legacy Node.js code, you might find references to a bare `exports` that has been deprecated in favor of the modern, `module.exports`. |

Some developers have the habit of replacing the default exports object:

```javascript
module.exports = {
  // exports
};
```

Note that the previous approach you are replacing the default `exports` object. This might have unintended behavior in circular dependencies that is very difficult to fix.
Because of that, it is much better to either use:

```javascript
module.exports.getName = getName; // no reassignment
```
or the following approach if you want to assign multiple exports at once, using object literal style definition:

```javascript
Object.assign(module.exports, { /* multiple exports */ })
```

| NOTE: |
| :---- |
| The previous code is using `Object.assign(...)` to perform a shallow copy of all the properties of the literal object onto the existing `module.exports` instead of replacing it. This is flagged as safer by the author of YDKJS, but no recommendation to do so is given on the Node.js documentation. |

### Modern ES Modules (ESM/ECMAScript Modules)

ECMAScript modules are the official standard format to package JavaScript code for reuse, and it shares several similarities with the CommonJS format:
+ ECMAScript modules are file based
+ ECMAScript modules are singletons

ECMAScript modules can be used straight away in browser-based JavaScript, but require special changes in Node.js projects and therefore are discussed in [60-ydkjs-02-ecmascript-modules](../60-ydkjs-02-ecmascript-modules).

## You don't know JS Examples
All the examples in this section are taken from https://github.com/getify/You-Dont-Know-JS, book 2 on [Scopes & Closures](https://github.com/getify/You-Dont-Know-JS/tree/2nd-ed/scope-closures).

Especifically, the summary and examples are based on the section [Using Closures](https://github.com/getify/You-Dont-Know-JS/blob/2nd-ed/scope-closures/ch8.md#chapter-8-the-module-pattern) section up to the Modern ES Modules (ESM) section. The section on the ECMAScript modules is discussed separately in [60-ydkjs-02-ecmascript-modules](../60-ydkjs-02-ecmascript-modules).