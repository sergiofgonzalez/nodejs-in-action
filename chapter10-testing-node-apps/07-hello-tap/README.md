# 07-hello-tap
> testing with `tap` testing library

## Description
Illustrates the basics of `node-tap` testing library.

To set up shop, you can start by just calling `tap.pass` which emits a passing test point.
Setting up shop:
```javascript

const tap = require("tap");
const SomeClass = require("../src/lib/some-lib.js");

tap.pass("test should be executable");
```

The most basic test consists in checking that the library can be loaded:
```javascript
tap.test("Library can be loaded", assert => {
  assert.plan(1);
  assert.ok(SomeClass);
});
```

The `assert.plan(number)` method specifies that a given number of tests are going to be run.
`assert.ok(arg)` resolves to true if the argument is truthy.


Alternatively, you can call `assert.end()` to signal that you're done with the test:
```javascript
tap.test("Library can be loaded", assert => {
  assert.ok(SomeClass);
  assert.end();
});
```
You can test sync stuff pretty easily using the same approach as above:
```javascript
tap.test("testing some sync stuff", assert => {
  assert.plan(1);
  const greeter = new SomeClass();
  assert.equal(greeter.getGreetingSync(), "Hello to unknown someone!");
});
```

And also async stuff using promises or async/await:
```javascript
tap.test("async/await", async assert => {
  assert.plan(1);

  const greeter = new SomeClass("Jason Isaacs");
  const greeting = await greeter.getGreetingAsync();
  assert.equal(greeting, "Hello to Jason Isaacs!");
});

tap.test("Promises", assert => {
  assert.plan(1);

  const greeter = new SomeClass("Jason Isaacs");
  greeter.getGreetingAsync()
    .then(greeting => assert.equal(greeting, "Hello to Jason Isaacs!"));
});

```

