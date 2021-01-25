# You don't Know JavaScript &mdash; 02: Scope and Closures
## 49 &mdash; Hello, Lexical Scope
> deep-dive concepts about JavaScript lexical scope, *hoisting* and mental models to understand how JavaScript engine works.

### Illustrating Lexical Scope
In JavaScript, scope is determined during code compilation: a model called "lexical scope" because the actual scope is determined on the first stage (lexing/parsing) of the compilation.

In order to correctly understand scope in JavaScript, it is often useful to use the metaphor that *variables* are colored marbles and *scopes* are colored buckets we used to put the marbles in. In this metaphor, when we need a *red marble* (variable) we know that we will find it in the *red bucket* (scope).

Let's consider the following example program, in which we annote the scopes using the metaphor introduced above:

```javascript
/* outer global scope: RED */
var = students [
  { id: 14, name: 'Kyle' },
  { id: 73, name: 'Suzy' },
  { id: 112, name: 'Frank' }
  { id: 6, name: 'Sarah' }
];

function getStudentName(studentId) {
  /* function scope: BLUE */
  for (let student of students) {
    /* loop scope: GREEN */
    if (student.id == studentId) {
      /* if scope: YELLOW */
      return student.name;
    }
  }
}

var nextStudent = getStudentName(73);
console.log(nextStudent);
```

The scopes become even more evident when visualizing the boundaries with colors.
![visualizing scopes](doc_images/bubbles.png)

Therefore, we can identify the variables that are available on each scope:

1. *RED* &mdash; global scope, which holds `students`, `getStudentName()` and `nextStudent`.
2. *BLUE* &mdash; the scope defined by the function, which holds `studentId`.
3. *GREEN* &mdash; the scope defined by the loop, which holds `student`.
4. *YELLOW* &mdash; the scope defined by the if clause, which holds no variable definition.

Scopes nest within each other, with child scopes entirely contained within their parent scope (so that `students` can be used within the *BLUE*, *GREEN* OR *YELLOW* scopes).
In more technical terms, references (non-declarations) to variables/identifiers are allowed in any given scope if there's a matching declaration in either the current scope, or in any parent scope of the current scope, but not with declaration of child/nested scopes. 

Another interesting metaphor involves a conversation between the different components of the JavaScript engine, as if they were friends:
  + the *Engine*: responsible for the start-to-finish compilation and execution of the program
  + the *Compiler*: who handles the parsing and code generation
  + the *Scope Manager*: who collects and maintains a lookup list of all the declared variabels and identifiers, and enforces that only those in the correct lexical scope are accesses.

Whenever the *engine* finds a new reference, it asks the *scope manager* whether it has seen it before or not, as in:

> Engine: hey, Scope Manager: I've a found a reference to `nextStudent`, have you seen it before?
> Scope Manager: Yes, it was formally declared in this scope, here it is.
> Engine: thanks, i'll initialize it to `undefined`

Note that when it comes to nested scopes, a different *scope manager* will exist for each of the times that scope is executed. Each scope automatically has all its identifiers registered at the start of the scope in what is known "variable hoisting".

This metaphor is useful to place variable references such as `students`, when found in a nested scope (the for-loop scope) in the correct scope (*RED* &mdash; the global scope).

### Shadowing

When you have two or more variables with the same name, defined in different scopes, the engine must make a decision about how to resolve references to that variable.

Consider the following example:

```javascript
/* RED: Global scope */
var sudentName = 'Suzy';

function printStudent(studentName) {
  /* BLUE: Function scope */
  studentName = studentName.toUpperCase();
  console.log(studentName);
}

printStudent('Frank');      // FRANK
printStudent(studentName);  // SUZY
console.log(studentName);   // Suzy
```

The `studentName` in the *BLUE* scope *shadows* the variable from the outerscope, and therefore, the one in the *RED* scope is never considered when doing reassignments. Also, it will be impossible to reference the *RED* `studentName` from the *BLUE* scope because of that reason.

### Copying is not Accessing

Consider the following sample code:

 ```javascript
 var special = 42;

 function lookingFor(special) {
   var another = { special: special }; // another = { special: 112...}

   function keepLooking() {
     var special = 3.141592;
     console.log(special);  // 3.14..
     console.log(another.special); // 112...
     console.log(window.special); // 42 (it does not apply to Node)
   }

   keepLooking();
 }

 lookingFor(112358132134);
 ```

The example demonstrates that if you copy the variable it becomes accessible on the nested scope, because it is not shadowed.

### Illegal Shadowing
`let` can shadow `var`, but `var` cannot shadow `let`.

```javascript
function foo() {
  let special = 'js';
  {
    var special = 'es'; // Syntax Error
  }
}
```

### Function name Scope

Function declarations creates an identifier in the enclosing scope.

```javascript
function askQuestion() {  /* creates an identifier in the global scope */
  function foo() {  /* creates an identifier in the scope defined by askQuestion() */
    
  }
}
```

Note that when using function expressions, the function itself will not *hoist*:

```javascript
var askQuestion = function () {...}
```

Same occurs if the function is not anonymous, the only difference is that the function can be called inside the function itself (which you can't do in anonymous functions). However it will not hoist, and therefore, the named function will not be available in outer scopes.

As a summary:
+ when a function is defined, a new scope is created. The positioning of scopes nested inside one another creates a natural scope hierarchy throughout the program, called the scope chain. 
+ each new scope offers a clean slate, a space to hold its own set of variables. When a variable name is repeated at different levels of the scope chain, shadowing occurs, which prevents access to the outer variable from that point inward.

### Global Scope

The global scope has become less relevant with the advent of ES modules for organizing code. In modern JavaScript, you can think of the global scope as the place that hosts:

+ primitives: `undefined`, `null`, `Infinity`, `NaN`
+ natives: `Date()`, `Object()`, `String()`, etc.
+ global functions: `eval()`, `parseInt()`, etc.
+ namespaces: `Math`, `Atomics`, `JSON`, etc.
+ friends of JavaScript: `Intl`, `WebAssembly`

Also the environment hosting the JavaScript engine exposes:
+ `console` and its methods
+ the *DOM* (`window`, `document`, ...)
+ timers (`setTimetout()`,...)
+ web platform APIs: `navigator`, `history`, `geolocation`, `WebRTC`, ...

### When can I use a variable?

Conside the following sample:

```javascript
greeting(); // Hello

function greeting() {
  console.log('Hello');
}
```

This code works, even when the function is invoked before it is declared. The term most commonly used for the mechanism that allows a variable to be visible from the beginning of the enclosing scope is called *hoisting*. However, hoisting alone does not fully answer the question, as it is not only that the `greeting` identifier is available, but also that you can call it before it's been seen. This is because when the function identifier is *hoisted*, it's additionally auto-initialized to that function's reference.

Note however that this mechanism only works for *formal function definitions* and not function expressions:

```javascript
greeting(); // TypeError

var greeting = function greeting() {
  console.log('Hello');
}
```

In addition, variables declared with `var` (this does apply to `let`/`const` declarations!) are also automatically initialized to `undefined` at the beginning of their scope (the nearest enclosing function, or the global). Once initialized, it's available to be used.

Therefore:
+ A `function` declaration is hoisted and initialized to its function value.
+ A `var` variable is also hoisted and auto-initialized to `undefined`. Any subsequent `function` expression assignments to that variable don't happen until that assignment is processed during runtime execution.

As a result, the name identifier (be it a variable or a function) is always hoisted, but the function reference isn't handled at initialization time unless the function was created in a formal `function` declaration.

Let's examine `var` hoisting in details with the following sample code:

```javascript
'use strict';

greeting = 'Hello';
console.log(greeting); // Hello

var greeting = 'Howdy';
console.log(greeting); // Howdy
```

That works even in *strict* mode because of *hoisting*, which is auto-initialized to `undefined`.

Therefore, it is sometimes useful to think of what actions the JavaScript engine performs when going through that code:

```javascript
var greeting = undefined; // (transformed by js engine) declaration is hoisted, auto-initialized to `undefined`
greeting = 'Hello';       // (original code)            assignment
console.log(greeting);    // (original code)            displays 'Hello'
greeting = 'Howdy';       // (transformed by js engine) `var` is removed 
console.log(greeting);    // (original code)            displays 'Howdy'
```

Understanding that *hoisting* is a two-step process (*actual hoisting* + initialization of *formally defined functions*/auto-initialization of to `undefined` for `var` ), can help understand programs like the following:

```javascript
studentName = 'Suzy';
greeting();

function greeting() {
  console.log(`Hello ${ studentName }`);
}

var studentName;
```

Thus, the JS engine will do as follows:

```javascript
function greeting() { console.log(`Hello ${ studentName }`); }  // (transformed by js engine) hoisted and auto-initialized to function definition
var studentName = undefined;                                    // (transformed by js engine) hoisted and auto-initialized to `undefined`
studentName = 'Suzy';                                           // (original code)            assignment
greeting();                                                     // (original code)            function call, displays 'Suzy'
// function greeting() {                                        // (transformed by js engine) removed, as hoisted
//   console.log(`Hello ${ studentName }`);
// }

// var studentName;                                             // (transfomed by js engine)  removed, as hoisted
```

JavaScript allows the redeclaration of variables using `var` (this does not apply to `let`/`const` declarations!). Fortunately, our mental model also works in these cases:

```javascript
var studentName = 'Frank';
console.log(studentName);

var studentName;
console.log(studentName);

var studentName = undefined;
console.log(studentName);
```

According to our *hoisting mental model* the code will be rearranged as:

```javascript
var studentName = undefined;    // (transformed by js engine) hoisting and auto-initialization to undefined
var studentName = undefined;    // (transformed by js engine) same, which results in noop
var studentName = undefined;    // (transformed by js engine) same, which results in noop
studentName = 'Frank';          // (transformed by js engine) `var` is removed, assignment is kept

console.log(studentName);       // (original code)            displays 'Frank'

studentName = undefined;        // (original code)            assignment
console.log(studentName);       // (original code)            displays undefined
```

| Note: |
| :---- |
| `let` and `const` do not allow redeclaration as the JavaScript governing body (the TC39 committee) agreed that it is a bad habit. |

The `const` keyword is even more constrained than `let` as it enforces that the variable is initialized when declared and cannot be reassigned.


All the scope rules (include redeclaration are applied per scope instance). Therefore, code like the following will work.

```javascript
var keepGoing = true;
while (keepGoing) {
  let value = Math.random();
  if (value > 0.5) {
    keepGoing = false;
  }
}
```

It works because each loop iteration creates a new scope instance, so actually `value` is only declared once, and therefore no error is thrown because of re-declaration.

Changing the value declaration for a `var` is even more interesting:
```javascript
var keepGoing = true;
while (keepGoing) {
  var value = Math.random();
  if (value > 0.5) {
    keepGoing = false;
  }
}
```
In this case, as `var` is not treated as a block-scoping declaration, value ends up being declared at the global scope level, so it shares the same bucket as `keepGoing` does.

Let's examine now what happens in for loops:

```javascript
for (let i = 0; i < 3; i++) {
  let value = i * 10;
  console.log(`${ i }: ${ value }`);
}
```

It's clear that `value` is not redeclared (as per the previous discussionn on the `while` loop), so let's focus on what happens with `i` .

The variable `i` is not defined in the outer scope, neither is being redeclared. You can do the following mental model:

```javascript
{
  let __i = 0;
  for (/* nothing */ ; __i < 3; __i++) {
    let i = __i;
    let value = i * 10;
    console.log(`${ i }: ${ value }`);
  }
} 
```

And the same mental model is valid for *for-in* and *for-of* loops:
```javascript
for (let index in students) { /* iterate over students enumerable properties */ }

for (let student of students) { /* iterate over students elements */ }
```

The declared variable (`index` and `student`) is treated as inside the loop body, and thus is handled per scope instance in each iteration.

It also gets trickier with `const` variables.

This is fine (no redeclaration, everything works as expected):

```javascript
var keepGoing = true;
while (keepGoing) {
  const value = Math.random();
  if (value > 0.5) {
    keepGoing = false;
  }
}
```

However, the situation is different in for loops:

```javascript
for (const i = 0; i < 3; i++) {
  /* fails with TypeError */
}
```

According to our previous mental model, this will be transformed into:

```javascript
{
  const $$i = 0;
  for (/* nothing */; $$i < 3; $$i++) {
    const i = $$i;
  }
}
```

The problem lies in the `const $$i = 0` declaration, as it happens once outside the for loop, and therefore, we don't get a fresh instance in each iteration, and therefore it fails.

There's one additional nuance we should be aware of: the *Temporal Dead Zone (TDZ)*. This is the time window where a variable exists but is still uninitialized and therefore cannot be accesses in any way. This TDZ only affects `let`/`const` declarations. The *TDZ* is a consequence of the two actions the compiler performs when it finds a variable:
+ it hoists the variable declaration to the top of the scope
+ it performs the initialization of the variable where the code says so

Let's consider the following code:
```javascript
var studentName = 'Kyle';
{
  console.log(studentName);

  let studentName = 'Suzy';
  console.log(studentName);
}
```

According to our mental model, this is what will happen:
```javascript
var studentName = 'Kyle';
{
  let studentName;  // hoisted by JavaScript engine
  console.log(studentName);  // Throws TDZ error: cannot access studentName before initialization

  studentName = 'Suzy';
  console.log(studentName);

}
```

The only way to reduce the *TDZ* is to put the `let` and `const` declarations at the top of any scope.

### Limiting Scope Exposure

## Key Takeaways
+ *Hoisting* actually means pulling the variable to the top of the scope and a subsequent auto-initialization of functions that have been declared formally, and `var` declarations. Function expressions and `let`/`const` declarations are unaffected.
+ `var` redeclarations are allowed. `let`/`const` redeclarations aren't.
+ The fact that `let`/`const` declarations are hoisted but not auto-initialized to `undefined` imply there's a chance that you try to use a variable before it has been assigned a value. This will trigger a runtime error. The only way to minimize this situation is by declaring the `let`/`const` variables at the top of their block scope.
+ Knowing the rules of *hoisting* and auto-initialization of formal function definitions and `var` declarations lets us apply a mental model that reorganizes the code as the JavaScript engine will do. A small addition of the mental model should be included to handle how the for-loops work (an additional block is created for the loop variable).


## You don't know JS Examples
All the examples in this section are taken from https://github.com/getify/You-Dont-Know-JS, book 2 on [Scopes & Closures](https://github.com/getify/You-Dont-Know-JS/tree/2nd-ed/scope-closures).

Especifically, the summary and examples are based on the following sections:
+ [Chapter 2: Illustrating Lexical Scope](https://github.com/getify/You-Dont-Know-JS/blob/2nd-ed/scope-closures/ch2.md#chapter-2-illustrating-lexical-scope)
+ [Chapter 3: The Scope Chain](https://github.com/getify/You-Dont-Know-JS/blob/2nd-ed/scope-closures/ch3.md#chapter-3-the-scope-chain)
+ [Chapter 4: Around the Global Scope](https://github.com/getify/You-Dont-Know-JS/blob/2nd-ed/scope-closures/ch4.md#chapter-4-around-the-global-scope)
+ [Chapter 5: The (Not So) Secret Lifecycle of Variables](https://github.com/getify/You-Dont-Know-JS/blob/2nd-ed/scope-closures/ch5.md#chapter-5-the-not-so-secret-lifecycle-of-variables) section.
