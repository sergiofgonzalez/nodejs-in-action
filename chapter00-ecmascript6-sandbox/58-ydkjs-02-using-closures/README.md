# You don't Know JavaScript &mdash; 02: Scope and Closures
## 58 &mdash; Using Closures
> practising closures

### Intro
*Closures* has traditionally been a daunting topic in JavaScript. In the previous section, the *principle of least exposure* was introduced, as a way to properly apply scoping rules to limit the exposure of variables.

*Closures* build on this approach: for variables we need to use over time, instead of placing them in larger outer scopes, we can encapsulate them while still preserving access to them from inside the functions. Functions *remember* these referenced scoped variable via *closure*.

*Closures* are one of the most important language characteristics ever invented in programming &mdash; it underlies major programming paradigms, including Function Programming, modules and Object-Oriented design. Getting comfortable with closures is fundamental for mastering JavaScript and leveraging many important design patterns.

| NOTE: |
| :---- |
| The closure can be rigorously defined after its behavior has been established. You can find the proper definition [here](#closure-defined). |

### See the Closure
Closure comes originally from lambda calculus. It is a behavior intrinsically bound to functions &mdash; if you're not dealing with functions, closure does not apply. For examples, objects cannot have closure, nor does a class. A class function or method migh have closure.

In order to understand the behavior associated to a closure, a function needs to be invoked in a different branch of the scope chain where it was originally defined. That is, a function executing in the same scope it was defined will not exhibit any observable different behavior with or without closure.

Consider the following pice of code, annotated according to our *bubble mental model* for scopes:
```javascript
// outer/global scope: RED(1)

function lookupStudent(studentID) {
  // function scope: BLUE(2)

  var students = [
    { id: 14, name: 'Jason' },
    { id: 73, name: 'Elizabeth' },
    { id: 112, name: 'Tom' },
    { id: 6, name: 'Ingrid' }
  ];

  return function greetStudent(greeting) {
    // function scope: GREEN(3)
    var student = students.find(student =>
      // function scope: ORANGE(4)
      student.id == studentID);

    return `${ greeting }, ${ student.name }!`;
  };
}

var chosenStudents = [
  lookupStudent(6),
  lookupStudent(73)
];
chosenStudents[0].name; // greetStudent (function name)

chosenStudents[0]('Hello');   // Hello, Ingrid!
chosenStudents[1]('Howdy');   // Howdy, Elizabeth!
```

The function `lookupStudent()` creates and returns an inner function called `greetStudent()`. This outer function is called twice in the program and the results are stored in an array.
Then, we check that the name of the function returned by `lookupStudent()` and stored in the array, and we also call the function for the two elements of the array with different parameters.

The relevant facts here are:
> `greetStudent()` received a single argument, however, the function is able to successfully resolve its references to both `students` and `studentID` which come from the scope of `lookupStudent()` rather than from the scope on which `chosenStudents[0]('Hello')` is invoked.

If JavaScript functions would not have closure, after the completion of each `lookupStudent()` call, the *garbage collector* would reclaim both `students`and `studentID` and the invocations on the array elements would fail with a *reference error*.

Note that even the arrow function passed to the `find()` method works as expected, holding the closure over `studentID`.

Let's examine another classic example used to introduce closures:

```javascript
function adder(num1) {
  return function addTo(num2) {
    return num1 + num2;
  };
}

var add10To = adder(10);
var add42To = adder(42);

add10To(15); // 25
add42To(9);  // 51
```

Each instance of the inner function is closing over its own `num1` variable, so it's not only that `num1` doesn't go away when adder finishes, but also that each of the *instantiation* of the function remember its own number. In short, everytime that the outer function is called, a new inner function instance is created, and for each new instance a new closure.

### Live Link, Not a Snapshot
A closure maintains a live link to the variable it closes over, not a snapshot of it. That lets the function to update the closed over variable as required.


In this example, a `makeCounter()` function is defined. This function returns an inner function that closes over `count` which gets updated everytime it is called.
```javascript
function makeCounter() {
  var count = 0;
  return function getCurrent() {
    count = count + 1;
    return count;
  };
}

const hits = makeCounter();

hits(); // 1
hits(); // 2
hits(); // 3
```

It must be noted that a closure does not require an inner function returned from an outer function &mdash; it is enough to have a function that closes over an outer scope:

Also, as the closure maintains a live-link to the variable, it cannot be used to *freeze* the value of a variable.
```javascript
var keeps = [];
for (var i = 0; i < 3; i++) {
  keeps[i] = function freezeIndexValue() {
    return i;
  };
}

console.log(`keeps[0]() = ${ keeps[0]() }`);
console.log(`keeps[1]() = ${ keeps[1]() }`);
console.log(`keeps[2]() = ${ keeps[2]() }`);
```

You might have expected the `keeps[0]()` to return `0`, `keeps[1]()` to return `1`, etc. but that's not the case because `freezeIndexValue()` closes over `i` as a variable, instead of creating an snapshot of its value.

That could be achieved by making the inner function to close over a different variable on each iteration:

```javascript
var keeps = [];
for (var i = 0; i < 3; i++) {
  let j = i;
  keeps[i] = function freezeIndexValue() {
    return j;
  };
}

console.log(`keeps[0]() = ${ keeps[0]() }`);  // 0
console.log(`keeps[1]() = ${ keeps[1]() }`);  // 1
console.log(`keeps[2]() = ${ keeps[2]() }`);  // 2
```

Also, as `let` creates a new variable on each iteration, you could do:
```javascript
var keeps = [];
for (let i = 0; i < 3; i++) {
  keeps[i] = function freezeIndexValue() {
    return j;
  };
}

console.log(`keeps[0]() = ${ keeps[0]() }`);  // 0
console.log(`keeps[1]() = ${ keeps[1]() }`);  // 1
console.log(`keeps[2]() = ${ keeps[2]() }`);  // 2
```

### Common Closures

Closure is most commonly encountered with callbacks:

```javascript
function lookupStudentRecord(studentID) {
  ajax(`https://some.api.student/${ studentID }`), function onRecord(record) {
    console.log(`${ record.name } ${ studentID });
  });
}

lookupStudentRecord(123);
```

The `onRecord()` callback will be invoked after the response from the `ajax()` function has completed. Thanks to `onRecord()` closing over the variables of the outer context, `studentID` will be available to the callback.

Event handlers are another common usage of closure:

```javascript
function listenForClicks(btn, label) {
  btn.addEventListener('click', function onClick() {
    console.log(`The ${ label } button was clicked`);
  });
}

const submitBtn = document.querySelector('#submit-btn');
listenForClicks(submitBtn, 'Checkout');
```

The event handler function `onClick()` will close over the `label` variable so that it can be used long after `listenForClicks()` has completed its execution.

### Not Everything is a Closure
The closure concept involves a function that is able to access variables from an outer scope long after the outer scope is gone. Therefore, there are several cases on which closures are not established.

For example, the following code is not a closure, as the inner function is accessing variables from the outer scope while it is still active (that's just lexical scope, not closure):

```javascript
function say(myName) {
  var greeting = 'Hello';
  output();

  function output() {
    console.log(`${ greeting }, ${ myName }`);
  }
}
```

The following example is similar, but involves accessing variables from the global scope:

```javascript
var students = [
  { id: 14, name: 'Jason' },
  { id: 73, name: 'Elizabeth' },
  { id: 112, name: 'Tom' },
  { id: 6, name: 'Ingrid' }
];

function getFirstStudent() {
  return function firstStudent() {
    return students[0].name;
  }
}

var student = getFirstStudent();
student(); // Jason
```

The inner function, `firstStudent()` does not need to close over `students`, as it is available in the global scope.

Also variables that are not accessed by inner functions are not closed over:

```javascript
function lookupStudent(studentID) {
  return function nobody() {
    console.log(`Nobody's here yet.`);
  }
}

var student = lookupStudent(112);
student();
```

And if there is no function invocation of the inner function, a closure won't be established either:

```javascript
function greetStudent(studentName) {
  return function greeting() {
    console.log(`Hello, ${ studentName }`);
  }
}

greetStudent('Kyle'); // no invocation of inner function
```

### Closure Defined
At this point, we're ready to give a rigorous definition of a closure:
> Closure is a concept that is observed when a function uses variables from outer scopes even while running in a scope where those variables wouldn't be accessible.

As a result:
+ a function must be involved
+ the function must reference at least one variable from an outer scope
+ the function must be invoked in a different branch of the scope chain from the variables the function references


### Closure Lifecycle and Garbage Collection
As closure maintain references to variables long after the scope in which they were defined is gone. This fact will prevent the garbage collector from reclaim those variables, which may lead to run-away memory usage over time.

In order to mitigate this situation, it is important to discard function references when those are no longer needed.

```javascript
function manageBtnClickEvents(btn) {
  var clickHandlers = [];

  return function listener(cb) {
    if (cb) {
      let clickHandler = function onClock(evt) {
        console.log(`clicked!`);
        cb(evt);
      };
      clickHandlers.push(clickHandler);
      btn.addEventListener('click', clickHandler);
    } else {
      // if invoked with no cb measn proceed to unsubscribe
      for (let handler of clickHandlers) {
        btn.removeEventListener('click', handler);
      }
      clickHandlers = [];
    }
  }
}

var mySubmitBtn = document.querySelector('#submit-btn');
var onSubmit = manageBtnClickEvents(mySubmitBtn);
onSubmit(function checkout(evt) {
  // handle checkout
});

onSubmit(function trackAction(evt) {
  // log action for tracking analytics pirposes
});

...

// unsubscribe all handlers once done
onSubmit();
```

In summary:
+ do not forget to remove event handlers when those are no longer needed
+ remove the handlers if those have been kept in internal memory areas (arrays of handlers, etc.)

### Per Variable or Per Scope discussion
This section discusses whether when a closure is involved, all of the outer scope variables are closed over, or only the referenced ones.

Consider the following example:

```javascript
function manageStudentGrades(studentRecords) {
  var grades = studentRecords.map(getGrade);
  return addGrade;

  function getGrade(record) {
    return record.grade;
  }

  function sortAndTrimGradesList() {
    grades.sort(function desc(g1, g2) {
      return g2 - g1;
    });
    grades = grades.slice(0, 10); // keep only top 10 grades
  }

  function addGrade(newGrade) {
    grades.push(newGrade);
    sortAndTrimGradesList();
    return grades;
  }
}

var addNextGrade = manageStudentGrades([
  { id: 14, name: 'Jason', grade: 86 },
  { id: 73, name: 'Ingrid', grade: 87 },
  { id: 112, name: 'Idris', grade: 75 },
  { id: 6, name: 'Sarah', grade: 91 }
]);

console.log(addNextGrade(81));  // [ 91, 87, 86, 81, 75 ]
console.log(addNextGrade(68));  // [ 91, 87, 86, 81, 75, 68 ]
```

In this example, the `grades` variable is closed over, but not the `studentRecords` one. In fact, when debugging the code you could see that the debugger is not listing `studentRecords` as an available variable. This however, has to do more with engine optimizations. If the engine detects that it should keep the entire outer scope accessible, it will do that.

### Some Ways to Improve Code with Closures
Let's consider that we have a button on a page that when clicked shoud send some data to the server using a function `ajax()`.

Without considering closures, the code could look like:

```javascript
var APIendpoints = { studentIDs: 'https://some.api/register-students' };
var data = { studentIDs: [ 14, 73, 112, 6 ] };

function makeRequest(evt) {
  var btn = evt.target;
  var recordKind = btn.dataset.kind;
  ajax(APIendpoints[recordKind], data[recordKind]);
}

// <button data-kind="studentIDs">Register Students</button>
btn.addEventListener('click', makeRequest);
```

The code will work without provblems, but it can be greatly improved with closures:

```javascript
var APIendpoints = { studentIDs: 'https://some.api/register-students' };
var data = { studentIDs: [ 14, 73, 112, 6 ] };

function setupButtonHandler(btn) {
  var recordKind = btn.dataset.kind;

  btn.addEventLister('click', function makeRequest() {
    ajax(APIendpoint[recordKind], data[recordKind]);
  });
}

// <button data-kind="studentIDs">Register Students</button>
setupButtonHandler(btn);
```

Now, `data-kind` attribute is retrieved only once, and `makeRequest()` will have access to it through closure.

This can be taken even further, so that the endpoint and data are also closed over:

```javascript
var APIendpoints = { studentIDs: 'https://some.api/register-students' };
var data = { studentIDs: [ 14, 73, 112, 6 ] };

function setupButtonHandler(btn) {
  var recordKind = btn.dataset.kind;
  var requestURL = APIendpoint[recordKind];
  var requestData = data[recordKind];

  btn.addEventLister('click', function makeRequest() {
    ajax(requestURL, requestData);
  });
}

// <button data-kind="studentIDs">Register Students</button>
setupButtonHandler(btn);
```

Closure also play an important role in *Functional Programming* techniques such as partially applied functions and currying. The underground concept consists in alter the shape of functions that require multiple inputs by providing some of them up front, while the remaining will be provided later.

This can be also be applied to the previous example, to make it even more elegant:

```javascript
function defineHandler(requestURL, requestData) {
  return function makeRequest(evt) { // evt is not used, but kept for illustration purposes
    ajax(requestURL, requestData);
  };
}

function setupButtonHandler(btn) {
  var recordKind = btn.dataset.kind;
  var handler = defineHandller(APIendpoints[recordKind], data[recordKind]);
  btn.addEventListener('click', handler);
}
```

The `requestURL` and `requestData` are provided ahead of time, resulting in `makeRequest()` a partially applied function labeled as `handler`. When the event is triggerd, the `evt` completes the inputs for the handler and the request will be performed.

### An alternative Mental Model for Closures

Let's consider again the following piece of code to explore an alternative mental model to rationalize closures:

```javascript
// outer/global scope: RED(1)

function adder(num1) {
  // function scope: BLUE(2)

  return function addTo(num2) {
    // function scope: GREEN(3)
    return num1 + num2;
  };
}

var add10To = adder(10);
var add42To = adder(42);

add10To(5); // 15
add42To(9); // 51
```

The alternative mental model embraces that functions (like all non-primitive values) are held as references in JavaScript, and assigned as passed around by reference-copy. As a consequence, functions stay in place in their own scope environment, with their scope chain intact, and just the reference is made available when passing that function.

Then the closure concept can be described as the mechanism to keep the function instance alive, along with its scope and scope chain, while there are function references floating around in the running program.

### Summary

We have explored a mental model that defines the closure by its *observational effects* as a function instance that remember its outer variables even as that function is passed to and invoked in other scopes.

Closures can improve effiency and maintainability of programs, as functions will be able to remember previously determined information without having to pass additional data around, or recompute it each time; and also let us efficiently apply the *principle of least exposure* so that referenced variables do not need to be exposed as global variables.

## You don't know JS Examples
All the examples in this section are taken from https://github.com/getify/You-Dont-Know-JS, book 2 on [Scopes & Closures](https://github.com/getify/You-Dont-Know-JS/tree/2nd-ed/scope-closures).

Especifically, the summary and examples are based on the section [Using Closures](https://github.com/getify/You-Dont-Know-JS/blob/2nd-ed/scope-closures/ch7.md#chapter-7-using-closures) section.