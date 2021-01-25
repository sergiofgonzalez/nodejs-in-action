# You don't Know JavaScript &mdash; 01: Get Started
## 47 &mdash; So Many Function Forms
> Illustrating anonymous and named function expressions, the `.name` property and all the shapes and forms of functions in JavaScript.

### Anonymous and Named Function Expressions

The following is an unnamed function expression:

```javascript
const awesomeFunction = function (coolMessage) {
  coolMessage = 'Hello to Jason Isaacs!';
  return coolMessage;
};
```

As such, it has no name identifier, and therefore, you cannot call the function from within itself (no recursion).

Although it is anonymous, you can do the following, and JavaScript will infer the name:

```javascript
console.log(awesomeFunction.name); // awesomeFunction
```

A named function expression is similar:

```javascript
const sayHiFn = function sayHi() {
  console.log('Hi!');
};

console.log(`sayHiFn.name`); // sayHi
```

### All function forms as of ES2020

The following example demonstrates all the different shapes and forms on which you can find functions in JavaScript:

```javascript
function one() {}
function *two() {}
async function three() {}
async function *four() {}
(function() {})();
(function namedIIFE(){})();
(async function(){})();
(async function asyncNamedIIFE(){})();
f = () => 42;
f = x => x * 2;
f = (x) => x * 2;
f = (x, y) => x * y;
f = x => ({ x: x * 2});
f = x => { return x * 2; };
f = async x => { 
  let y = await doSomethingAsync(x);
  return y * 2;
};
someOperation(x => x * 2);
```

### Functions in Classes
Functions can also be found in class definitions. They're typically referred as methods.
Note how the syntax has some differences depending on how the class is defined:

```javascript
class SomeClass {
  coolMethod() { }
  someOtherMethod() { }
}

const objInstance = {
  coolMethod() { },
  oldSchoolDef: function() { }
};
```


## You don't know JS Examples
All the examples in this section are taken from https://github.com/getify/You-Dont-Know-JS.
Especifically, this example is based on [So Many Function Forms](https://github.com/getify/You-Dont-Know-JS/blob/2nd-ed/get-started/apA.md#so-many-function-forms) section.
