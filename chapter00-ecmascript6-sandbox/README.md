# Chapter 0 &mdash; EcmaScript 6 examples
> Node.js examples on ES6 concepts

## [00-prj-template](00-prj-template/)
Basic template for ES6 based applications.

## [01-ecmascript6-classes-node](01-ecmascript6-classes-node/)
Compares the syntax of prototype classes and the new ES6 class syntax.

## [02-ecmascript6-const-let](02-ecmascript6-const-let/)
Illustrates the use of const and let.

## [03-ecmascript6-hello-promises](03-ecmascript6-hello-promises/)
Illustrates the most basic example of promises in Node.

## [04-ecmascript6-promise-chaining-simple](04-ecmascript6-promise-chaining-simple/)
Illustrates how to do a simple *waterfall* sequence of Promise calls.

## [05-ecmascript6-promise-chaining-complex](05-ecmascript6-promise-chaining-complex/)
Illustrates how to do a more complex chaining of Promise calls.

## [06-ecmascript6-promise-parallel](06-ecmascript6-promise-parallel/)
Illustrates how to do a *parallel* sequence of Promise calls using `Promise.all` and `Promise.race`.

## [07-ecmascript6-template-strings](07-ecmascript6-template-strings/)
Illustrates how to use *ES6 template strings* to insert values in strings without using concatenation.

## [08-ecmascript6-arrow-functions](08-ecmascript6-arrow-functions/)
Illustrates how to use *ES6 arrow functions* to simplify the syntax of functions taking functions as parameters.

## [09-ecmascript6-property-value-shorthands](09-ecmascript6-property-value-shorthands/)
Illustrates how to use *ES6 property value shorthands* to simplify the assignments of properties to objects when the variables holding those objects already have the desired name.

## [10-ecmascript6-computed-properties](10-ecmascript6-computed-properties/)
Illustrates how to use *ES6 computed properties* to define object properties that don't have a fixed value until runtime.

## [11-ecmascript6-method-definitions](11-ecmascript6-method-definitions/)
Illustrates how to use *ES6 method definitions* to define functions in JavaScript objects.

## [12-ecmascript6-assignment-destructuring-objects](12-ecmascript6-assignment-destructuring-objects/)
Illustrates how to use *ES6 destructuring* in JavaScript objects as a shorthand notation when extratcting specific properties from objects.

## [13-ecmascript6-assignment-destructuring-arrays](13-ecmascript6-assignment-destructuring-arrays/)
Illustrates how to use *ES6 destructuring* in JavaScript arrays as a shorthand notation when extratcting specific properties from objects.

## [14-ecmascript6-assignment-destructuring-function-params](14-ecmascript6-assignment-destructuring-function-params/)
Illustrates how to use *ES6 destructuring* in function parameters.

## [15-ecmascript6-assignment-destructuring-misc](15-ecmascript6-assignment-destructuring-misc/)
Illustrates several misc use cases in which assignment destructuring is specially useful.

## [16-ecmascript6-rest-parameters](16-ecmascript6-rest-parameters/)
A couple of examples about the usage of the rest `...` parameters for functions with a variable argument list.

## [17-ecmascript6-spread-operator](17-ecmascript6-spread-operator/)
Illustrate use case scenarios for the spread operator `...`.

## [18-ecmascript6-object-improvements](18-ecmascript6-object-improvements/)
Illustrate `Object.assign` and `Object.is` methods.

## [19-ecmascript6-hello-iterators](19-ecmascript6-hello-iterators/)
Illustrates the basics of the iterable protocol of ES6 that lets you turn regular JavaScript objects into sequences that can be iterated over.

## [20-ecmascript6-infinite-sequences](20-ecmascript6-infinite-sequences/)
Illustrates the basics of the iterable protocol of ES6 with infinite sequences, how to extract values from them and how to encapsulate in functions.

## [21-ecmascript6-iterating-over-object-maps](21-ecmascript6-iterating-over-object-maps/)
Illustrates how to convert a key-value JavaScript object into an iterable sequence.

## [22-ecmascript6-hello-generators](22-ecmascript6-hello-generators/)
Illustrates the basics of generator functions, how to define them and use them.

## [23-ecmascript6-generators-returning-generators](23-ecmascript6-generators-returning-generators/)
Illustrates how a generator can yield another generator or iterable object using `yield*`.

## [24-ecmascript6-generators-iterating-manually](24-ecmascript6-generators-iterating-manually/)
Basic example illustrating how to iterate manually over the sequence given by a generator function.

## [25-ecmascript6-generators-passing-params](25-ecmascript6-generators-passing-params/)
Exploring what passing arguments to `next()` in generators functions mean.

## [26-ecmascript6-generators-advanced](26-ecmascript6-generators-advanced/)
Explores advanced uses of generators using as example the implementation of the Magic 8-ball.

## [27-ecmascript6-generators-async-flows](27-ecmascript6-generators-async-flows/)
Illustrates how to use generator functions in async flows.

## [28-ecmascript6-generators-throwing-errors](28-ecmascript6-generators-throwing-errors/)
Illustrates how to use `throw` from generators and how to catch those exceptions from client code.

## [29-ecmascript6-generators-return](29-ecmascript6-generators-return/)
Illustrates the effect of *returning* from generator sequences and generator functions.

## [30-ecmascript6-hello-async-await](30-ecmascript6-hello-async-await/)
Illustrates how to synchronize promises using `async` functions and the `await` keyword.

## [31-ecmascript6-async-await-flows](31-ecmascript6-async-await-flows/)
Illustrates how to manage parallel flows using async-await.

## [32-ecmascript6-async-iterators](32-ecmascript6-async-iterators/)
A *non-working* example of async iterators. The example does not run.

## [33-ecmascript6-collections](33-ecmascript6-collections/)
An introduction to the Map, WeakMap, Set and WeakSet with really simple examples that illustrate the API.

## [34-ecmascript6-hello-proxies](34-ecmascript6-hello-proxies/)
An introduction to ES6 proxies.

## [35-ecmascript6-private-properties-with-proxies](35-ecmascript6-private-properties-with-proxies/)
An implementation of a function that wraps an object in a proxy for which certain properties are protected agains reads and writes.

## [36-ecmascript6-revocable-proxies](36-ecmascript6-revocable-proxies/)
Illustrates basic usage of revocable proxies.

## [37-ecmascript6-async-await-loops](37-ecmascript6-async-await-loops/)
Illustrates the intricacies of using async/await in loops and gives some examples about how to do sequential *blocking* iteration and parallel iteration that only blocks at the end of the parallel processing.

## [38-ydkjs-01-typeof](38-ydkjs-01-value-type-determination/)
Illustrates what `typeof` returns for the basic types in JavaScript.

## [39-ydkjs-01-comparisons](39-ydkjs-01-comparisons/)
Grokking comparisons and equality in JS.

## [40-ydkjs-01-classes](40-ydkjs-01-classes/)
A refresher on JS classes.

## [41-ydkjs-01-es-modules](41-ydkjs-01-es-modules/)
A refresher on ES modules.

## [42-ydkjs-01-es-iterators](42-ydkjs-01-es-iterators/)
A refresher on ES iterators, iterables and the spread operator `...` to consume iterators.

## [43-ydkjs-01-closure](43-ydkjs-01-closure/)
A refresher on closures.

## [44-ydkjs-01-this](44-ydkjs-01-this/)
A refresher on `this` keyword.

## [45-ydkjs-01-prototypes](45-ydkjs-01-prototypes/)
A refresher on prototypes.

## [46-ydkjs-01-this-revisited](46-ydkjs-01-this-revisited/)
Revisiting `this` keyword in the context of prototypes.

## [47-ydkjs-01-function-forms](47-ydkjs-01-function-forms/)
Illustrating anonymous and named function expressions, the `.name` property and all the shapes and forms of functions in JavaScript.

## [48-ydkjs-01-coercive-conditional-comparison](48-ydkjs-01-coercive-conditional-comparison/)
Illustrating anonymous and named function expressions, the `.name` property and all the shapes and forms of functions in JavaScript.
Discussing how comparisons work in `if`, the ternary operator, `while` and `for` loops.

## [49-ydkjs-02-hello-lexical-scope](49-ydkjs-02-hello-lexical-scope/)
Mostly documentation and simple code samples about lexical scope, the concept of *hoisting* and auto-initialization of formal function definitions and `var` declarations.

## [50-ydkjs-02-hiding-in-function-scope/](50-ydkjs-02-hiding-in-function-scope/)
Mostly documentation and simple code samples about lexical scope, the concept of *hoisting* and auto-initialization of formal function definitions and `var` declarations.

## [51-ydkjs-02-hello-scoping-with-blocks/](51-ydkjs-02-hello-scoping-with-blocks/)
Practising scoping with blocks to limit exposure of variables.

## [52-ydkjs-02-var-vs-let/](52-ydkjs-02-var-vs-let/)
Learning the subtle differences between `let` and `var` and when to use each one correctly.

## [53-ydkjs-02-catch-scope/](53-ydkjs-02-catch-scope/)
Learning about the `catch` scope.

## [54-ydkjs-02-function-declarations-in-blocks/](54-ydkjs-02-function-declarations-in-blocks/)
Practising function declarations in blocks.

## [55-hello-optional-chaining/](55-hello-optional-chaining/)
Practising the optional chaining operator `?.`.

## [56-hello-nullish-coalescing/](56-hello-nullish-coalescing/)
Practising the nullish coalescing operator `??`.

## [57-hello-intl-datetime-formatting/](57-hello-intl-datetime-formatting/)
Practising `Intl.DateTimeFormatting` and its options to display language-sensitive dates and times.

## [58-ydkjs-02-using-closures/](58-ydkjs-02-using-closures/)
Practising closures.

## [59-ydkjs-02-module-pattern/](59-ydkjs-02-module-pattern/)
A discussion on building modules using a custom way, and CommonJS modules.

## [60-ydkjs-02-ecmascript-modules/](60-ydkjs-02-ecmascript-modules/)
Practising ECMAScript modules.

## [61-native-date-and-time/](61-native-date-and-time/)
Practising recent ECMAScript support for handling dates and times in the same way as `moment.js` and `date-fns`.

## [e01-dice-experiment-infinite-sequences](e01-dice-experiment-infinite-sequences/)
Illustrates a simple use case of infinite iterators modeling the experiment of throwing dice repeateadly and printing the results.

## [e02-playlist-as-iterator](e02-playlist-as-iterator/)
Illustrates a simple use case of ES6 iterators to model a playlist with songs that can be repeated a number of times and with optional shuffle.

## [e03-ecmascript6-misc-sandbox](e03-ecmascript6-misc-sandbox/)
A sandbox for misc ES6 examples.

## [e04-ecmascript6-simple-test-framework](e04-ecmascript6-simple-test-framework/)
A simple test framework for Node.js

## [e05-defining-a-promise-executes-it](e05-defining-a-promise-executes-it/)
A very basic example that illustrates that defining a promise executes it before it is invoked.

## [e06-hello-bind-and-apply](e06-hello-bind-and-apply/)
Illustrates a basic examples of `function.bind` and `function.apply`.

## [e07-hello-closure](e07-hello-closure/)
grokking closures and context.

## [e08-hello-throttled-function](e08-hello-throttled-function/)
Basic implementation of a throttling wrapper using higher-order functions.

## [e09-hello-rest-and-spread](e09-hello-rest-and-spread/)
Some examples using the *rest* and *spread* operators in JavaScript.

## [e10-ydkjs-01-practicing-comparisons](e10-ydkjs-01-practicing-comparisons/)
Practicing with value types and comparisons where coercion is involved. In the example, a function `scheduleMeeting` that returns whether a given meeting falls under working hours is developed.

## [e11-ydkjs-01-practicing-closure](e11-ydkjs-01-practicing-closure/)
Practicing with closure. In the example, a function `range` that returns a range of numbers of a function that can be used to return a range of numbers is developed.

## [e12-ydkjs-01-practicing-closure](e12-ydkjs-01-practicing-closure/)
Practicing prototypes. In the example, it is developed a slot machine that displays three rows corresponding to the positions of their three reels.