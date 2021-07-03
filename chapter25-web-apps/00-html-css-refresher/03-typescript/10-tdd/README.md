# TypeScript: Chapter 10 &mdash; Test-driven development
> TBD

## Contents

+ Exploring *Test-driven development (TDD)* in relation to TypeScript.
+ Categorizing the tests (unit/integration/acceptance and white/black box).
+ Introducing *Jest* testing framework.
+ Writing asynchronous tests.
+ Writing tests involving the *DOM*.
+ End-to-end testing using *Protractor* and *Selenium*

## Intro
Most of the modern world of JavaScript is based in frameworks that embrace some variation of the *Model-View-Controller (MVC)* pattern. One of the benefits of this style is that it lets you create individual test classes for the *models* you use, the *views* you use, and the *controllers* you use. You can also validate that the *DOM* elements on a web page are displaying correctly, and simulate button clicks, drop-down selects, form inputs, etc.

## The *TDD* testing paradigm

The *Test-Driven Development (TDD)* testing paradigm is about starting with tests, and drive the implementation of functionality through these tests:
+ Write a test that fails.
+ Run the test to ensure it fails.
+ Write code to make the test pass.
+ Run the test to see it passing.
+ Run all tests to see the new code does not break all other tests.
+ Repeat for each piece of functionality that is added/modified.

### Unit, integration, and acceptance tests

Tests can be broken down into three general areas:
+ unit tests
+ integration tests
+ acceptance tests

Also, the tests can be *black-box* or *white-box* tests. *Black-box* tests are the ones in which the internals of the code are not know to the tester, while *white-box* tests are the ones in which the tester is familiar with the internal logic and structure of the test.

#### Unit tests

A unit test is typically a *white-box* test where all of the external interfaces to a block of code are mocked or stubbed out.

This technique ensures that the object under test is always given a known set of data. When new requirements are added, this known set of data will have to be modified and updated as a consequence.

Objects under test should be designed to interact with interfaces, so that those interfaces can be easily mocked or stubbed in a unit test scenario.

#### Integration tests

Integration tests are another form of *white-box* testing that allow the object under test to run in an environment close to how it would look in a real deployment. This might include invoking external HTTP services, retrieving information from the database, etc.

Integration tests are the cornerstone of product quality, as they will let you identify pieces of code that pass the unit tests (because the dependencies are mocked) but that would the application fail in a real environment (e.g. because the response of an external service has changed its format).

#### Acceptance tests

Acceptance tests are *black-box* tests that are typically scenario-based. They would typically incorporate multiple user screens or user interactions in order to pass.

Automating acceptance tests ensures that the end-to-end functionality works as expected.


## Jest

[Jest](https://jestjs.io/), the JavaScript testing framework written by the *Facebook* team, integrates well with the TypeScript ecosystem.

It was written on top of *Jasmine*, and was aimed to reduce the configuration time needed to run *Jasmine*, as well as enhancing it and providing extra features, while leveraging his maturity as a testing framework.

*Jest* is provided through *NPM*, so to configure it you will have to:
+ Install `jest` and `@types/jest` as a *development* dependency.
+ Configure the `"test"` task in your `package.json` as `"test": "jest"`.

*Jest* will look for files named `*.spec.js` to run, where *spec* is short for *specification*.

Typically, your test spec files will sit alongside your normal components, in the same directory, so that a component named `search.js` will have a corresponding *spec file* named `search.spec.js`.


### `ts-jest`

`ts-jest` is a TypeScript bridge to Jest, which will take care of the compilation step, and the necessary integration between your TypeScript *spec files* and the JavaScript files *Jest* expects.

To install `ts-jest` you would do:

```bash
npm install ts-jest --save-dev
npx ts-jest config:init # this will create a `jest.config.js` file
```

| EXAMPLE: |
| :------- |
| See [01: Hello, *Jest* in TypeScript](01-hello-jest-ts) for an example showing the basic skeleton for this section. |

#### Watch mode

*Jest* includes a *watch mode* that will trigger the execution of the tests when a change in any of the project source code files is detected:

```json
{
  ...
  "scripts": {
    ...
    "test": "jest --watchAll --verbose"
  }
}
```

| NOTE: |
| :---- |
| The argument `--verbose` will print the in the console the name of each test to run. |

| EXAMPLE: |
| :------- |
| See [02: Test-driven development &mdash; Hello, *Jest watch-mode*](02-hello-jest-ts-watch-mode) for a runnable example. |

#### Grouping tests

*Jest* allows you to group tests into logical sets using the `describe()` function:

```typescript
describe('a group of tests', () => {
  test('first test', () => {
    expect('string value').toEqual('string value');
  });

  test('second test', () => {
    expect('abc').not.toEqual('def');
  })
});
```

| EXAMPLE: |
| :------- |
| See [03: Grouping *Jest* tests with `describe()`](03-jest-grouping-tests) for a runnable example. |

#### Forcing and skipping tests

It is possible in *Jest* to configure only a specific test or set of tests to run.

Consider the following test spec in which the first two tests are forced using two alternative syntax, followed by a test that will be skipped:

```typescript
describe('a group of tests', () => {
  test.only('first test (forced)', () => {
    expect('string value').toEqual('string value');
  });

  fit('second test (forced)', () => {
    expect('abc').not.toEqual('def');
  })

  test('third test (skipped)', () => {
    expect(false).toBeFalsy();
  });
});
```

The first test in the test suite is forced with `test.only()`, and the second is forced with `fit()`. The latter comes from *Jasmine*, which provides a function `it()` that plays the same role as the function `test()`. As a result, `fit()` is nothing more than a *forced-it*.

Similarly, you can force a particular test suite to be executed using `fdescribe()`. This will result in all the individual tests being forced. When using this approach, we can skip individual tests using `xit()`:

```typescript
fdescribe('another group of tests (forced)', () => {
  test('another first test', () => {
    expect('string value').toEqual('string value');
  });

  it('another second test', () => {
    expect('abc').not.toEqual('def');
  })

  xit('another third test', () => {
    expect(true).toBeFalsy();
  });
});
```

The previous snippet will force the execution of the first two tests, and skip the third one.

Note that once you configure a test spec with `test.only()`, `fit()` and `fdescribe()` only the forced tests will be executed. That is, the following spec will result in only the first two tests from the spec being executed:

```typescript
describe('a group of tests', () => {
  test.only('first test (forced)', () => {
    expect('string value').toEqual('string value');
  });

  fit('second test (forced)', () => {
    expect('abc').not.toEqual('def');
  })

  test('third test (skipped)', () => {
    expect(false).toBeFalsy();
  });
});

describe('another group of tests (forced)', () => {
  test('another first test', () => {
    expect('string value').toEqual('string value');
  });

  it('another second test', () => {
    expect('abc').not.toEqual('def');
  })

  xit('another third test', () => {
    expect(true).toBeFalsy();
  });
});
```

```
 PASS  app/src/hello-jest.spec.ts
  a group of tests
    ✓ first test (forced) (2 ms)
    ✓ second test (forced)
    ○ skipped third test (skipped)
  another group of tests (forced)
    ○ skipped another first test
    ○ skipped another second test
    ○ skipped another third test
```

| EXAMPLE: |
| :------- |
| See [04: Forcing and skipping tests in *Jest*](04-jest-forcing-and-skipping-tests) for a runnable example. |

### Matchers

*Jest* comes with its own set of *matchers* to use when asserting that the result of a test is the expected one.

#### `toBe()`

The `toBe()` matcher checks for object equality. This means that two objects with the same shape will not match:

```typescript
  it('failed test with numbers', () => {
    expect(1).toBe(2);  // fails
  });

  it('passed test with numbers', () => {
    expect(5).toBe(5);  // pass
  });

  it('passed: toBe checks for object equality', () => {
    const obj1 = { id: 1 };
    const obj1Ref = obj1;
    expect(obj1).toBe(obj1Ref); // pass
  });

  it('failed: toBe checks for object equality', () => {
    const obj1 = { id: 1 };
    const obj2 = { id: 1 };
    expect(obj1).toBe(obj2);  // fails
  });
```

### `toEqual()` and `toStrictEqual()`

The matchers `toEqual()` and `toStrictEqual()` will check for equality based on the object properties.

```typescript
it('passed: toEqual checks for properties equality', () => {
  const obj1 = { id: 1, person: { name: 'Jason Isaacs', age: 53 } };
  const obj1Ref = obj1;
  expect(obj1).toEqual(obj1Ref);
});

it('passed: toEqual checks for properties equality', () => {
  const obj1 = { id: 1, person: { name: 'Jason Isaacs', age: 53 } };
  const obj2 = { id: 1, person: { name: 'Jason Isaacs', age: 53 } };
  expect(obj1).toEqual(obj2);
});
```

Note that the need for `toStrictEqual()` is not so big in TypeScript as the type system will pick up things like `true == 1`.

### `toContain()` and `toContainEqual()`

You can use `toContain()` to check for the existence of a substring in a string and for checking the existence of an object in a list (using object equality):

```typescript
  test('pass: list contains an item (object equality)', () => {
    const obj1 = { id: 1 };
    const obj2 = { id: 2 };
    const list = [ obj1, obj2 ];
    expect(list).toContain(obj1);
  });

  test('fail: list contains an item (object shape)', () => {
    const list = [ { id: 1 }, { id: 2 } ];
    expect(list).toContain({ id: 1 });
  });
```

You can also use `toContainEqual()` if you want to check the object shape (properties and their values) rather than object equality:

```typescript
  test('pass: list contains an item (object shape)', () => {
    const list = [ { id: 1 }, { id: 2 } ];
    expect(list).toContainEqual({ id: 1 });
  });

```

#### Using `not`

You can reverse expectations using `not`:

```typescript
  test('pass: test with numbers', () => {
    expect(1).not.toBe(2);
  });


  test('pass: list does not contains an item (object shape)', () => {
    const list = [ { id: 1 }, { id: 2 } ];
    expect(list).not.toContainEqual({ id: 3 });
  });
```

#### Using `toThrowError()`

You can use `toThrowError()` when you expect that a certain operation throws an exception:

```typescript
test('pass: should throw specific error', () => {
  expect(() => {
    throw new Error('fabricated error');
  }).toThrowError(new Error('fabricated error'));
});

test('pass: should throw any error', () => {
  expect(() => {
    throw new Error('fabricated error');
  }).toThrowError();
});
```

| EXAMPLE: |
| :------- |
| See ### [05: *Jest* matchers](05-jest-matchers)
for a sandbox that illustrates the matchers of this section, and where you can include additional tests and test suites. |

### Test setup and teardown

*Jest* has very good support to configure setup and teardown tasks for tests and test suites.

Consider the following test the illustrates how to test a simple `GlobalCounter` class:

```typescript
// src/lib/global-counter.ts
export class GlobalCounter {
  count = 0;
  increment(): void {
    this.count++;
  }
}

// test/global-counter.test.ts
describe('GlobalCounter Test Suite with test setup and teardown', () => {
  let globalCounter: GlobalCounter;

  beforeAll(() => {
    globalCounter = new GlobalCounter();
  });

  beforeEach(() => {
    globalCounter.count = 0;
  });

  afterEach(() => {
    console.log(`globalCounter count after test was: `, globalCounter.count);
  });

  test('should increment', () => {
    globalCounter.increment();
    expect(globalCounter.count).toBe(1);
  });

  test('should increment twice', () => {
    globalCounter.increment();
    globalCounter.increment();
    expect(globalCounter.count).toBe(2);
  });
});
```

As you can see, *Jest* provides `beforeAll()`, `afterAll()`, `beforeEach()` and `afterEach()` to accommodate these activities.

| EXAMPLE: |
| :------- |
| See [06: *Jest* test setup and teardown](06-jest-setup-teardown-tasks) for a runnable example. |

### Data-driven tests

Consider the following test, in which we feed several values to a given test:

```typescript
describe('data driven test suite', () => {
  [1, 2, 3, 4, 5].forEach((value: number) => {
    test(`${ value } must be less than 5`, () => {
      expect(value).toBeLessThan(5);
    });
  });
});
```

This will generate several individual tests as can be seen in the *Jest* test report:

```
 FAIL  app/test/data-driven.test.ts
  data driven test suite
    ✓ 1 must be less than 5 (2 ms)
    ✓ 2 must be less than 5
    ✓ 3 must be less than 5
    ✓ 4 must be less than 5
    ✕ 5 must be less than 5 (2 ms)
```

This idea can be enhanced to accommodate more complex use cases:

```typescript
describe('Hello multiple data driven test cases', () => {

  function testUsing<T>(values: T[], func: Function) {
    for (const value of values) {
      func.apply(Object, [value]);
    }
  }

  testUsing([
    [ undefined, false ],
    [ null, false ],
    [ ' ', false ],
    [ '  ', false ],
    [ ' a ', true ],
    ['a', true ],
    ['a ', true ],
    [' a', true]
  ], ([value, expectedFuncRetValue]: [string, boolean]) => {
    test(`"${ value }" is not empty string should be ${ expectedFuncRetValue }`, () => {
      expectedFuncRetValue ?
        expect(isNotEmptyString(value)).toBeTruthy() :
        expect(isNotEmptyString(value)).toBeFalsy();
    });
  });
});
```

| EXAMPLE: |
| :------- |
| See [07: *Jest* data-driven tests](07-jest-data-driven-tests) for a runnable example. |

### Jest mocks
*Jest* also provides support for mocks.

```typescript
// src/lib/my-class.ts
export class MyClass {
  executeCb(value: string, cb: (value: string) => null): void {
    console.log(`executeCb: invoking callback`);
    cb(value);
  }
}

// src/test/my-class.test.ts
describe('Hello, mocks!', () => {

  test('should invoke callback', () => {
    const mock = jest.fn();

    const myClassObj = new MyClass();
    myClassObj.executeCb('test', mock);

    expect(mock).toHaveBeenCalled();
  });


  test('should invoke callback with given args', () => {
    const mock = jest.fn();

    const myClassObj = new MyClass();
    myClassObj.executeCb('arg-value', mock);

    expect(mock).toHaveBeenCalledWith('arg-value');
  });

});
```
| EXAMPLE: |
| :------- |
| See [08: *Jest* mocks](08-jest-mocks) for a runnable example. |


### Jest spies

*Jest* provides support for *spies* too, that can be used to validate that a particular class method has been called.

Consider the following snippet that features the tests of a simple class using spies and mocks:



```typescript
// src/lib/my-class.ts
export class MyClass {
  testFunction(): void {
    console.log(`testFunction() called`);
    this.someOtherFunction();
  }

  someOtherFunction(): void {
    console.log(`someOtherFunction() called`);
  }

  functionReturningValue(): number {
    return 5;
  }
}

// test/my-class.test.ts
import { MyClass } from '../src/lib/my-class';

describe('Hello, spies!', () => {

  test('should invoke someOtherFunction()', () => {
    const myClassObj = new MyClass();
    const testFunctionSpy = jest.spyOn(
      myClassObj, 'someOtherFunction'
    );

    myClassObj.testFunction();
    expect(testFunctionSpy).toHaveBeenCalled();
  });

  test('should call testFunction()', () => {
    const myClassObj = new MyClass();
    const testFunctionSpy = jest.spyOn(
      myClassObj, 'testFunction'
    ).mockImplementation(() => {
      console.log(`mockImplementation called`);
    });

    myClassObj.testFunction();
    expect(testFunctionSpy).toHaveBeenCalled();
  });


  test('should return value', () => {
    const myClassObj = new MyClass();
    jest.spyOn(
      myClassObj, 'functionReturningValue'
    ).mockImplementation(() => {
      return 10;
    });

    expect(myClassObj.functionReturningValue()).toEqual(10);
  });
});
```

In the first test, you create a *spy* on a class method to validate that it is actually invoked.

In the second one, you create a *spy* for a function and provide a *mocked* implementation.

In the third one, you do something similar but the mock implementation returns a value.

When you create a *spy* on a method, you will be able to check whether the method was invoked and check the parameters received. However, a *spy* does call the actual method. If you want to override the logic of the function you will have to provide a *mock* implementation.

An example in which *mocking* will be helpful, is when you want to prevent a certain method to access the database. As seen in the third test, you can even provide a *mock implementation* that returns values so that you can test the different types of situations you might find when interacting with external services like databases (no data, single record, multiple records, error thrown, etc.) without really sending requests to the database.

| EXAMPLE: |
| :------- |
| See [09: Test-driven development &mdash; *Jest* spies](09-jest-spies) for a runnable example. |

## Asynchronous tests

Consider the following class that provides a method that executes a callback asynchronously with a given fixed value:

```typescript
// app/src/lib/my-class.ts
export class MyClass {
  executeCbAsynchronously(cb: (value: string) => void): void {
    setTimeout(() => {
      cb(`completed!`);
    }, 1000);
  }
}
```

Let's assume that you have to write a test to validate that the callback is invoked with the given argument.

The first attempt might look something like this:

```typescript
describe('Hello, async tests!', () => {
  test('fails: should wait for callback to complete', () => {
    const myClassObj = new MyClass();
    let valueReceivedInCb!: string;
    myClassObj.executeCbAsynchronously((value: string) => {
      valueReceivedInCb = value;
    });
    expect(valueReceivedInCb).toBe('completed!');
  });
});
```

It is fairly obvious that the test will fail, as the expectation will be executed before we have assigned the value to `valueReceivedInCb` variable.

This can be fixed using `done()`. This function is used to notify *Jest* that the async test has completed and that the expectations can take place.

Note that we will need to rewrite the test as follows:

```typescript
describe('Hello, async tests with done!', () => {
  let valueReceivedInCb!: string;

  beforeEach((done: jest.DoneCallback) => {
    const myClassObj = new MyClass();
    myClassObj.executeCbAsynchronously((value: string) => {
      valueReceivedInCb = value;
      done();
    });
  });

  test('pass: should wait for callback to complete', () => {
    expect(valueReceivedInCb).toBe('completed!');
  });
});
```

By default, *Jest* will wait for 5 seconds before causing a timeout failure when using `done()`.

If you want to increase the timeout you have to update your `jest.config.js` file adding:

```javascript
module.exports = {
  testTimeout: 5000,
  preset: 'ts-jest',
  testEnvironment: 'node',
...
  testTimeout: 20000
};
```


You can use *async/await* in the same way you'd use it in your application code:

```typescript
// src/lib/my-class.ts
export class MyClass {
  delayedPromise(): Promise<string> {
    return new Promise<string>((resolve) => {
      setTimeout(() => {
        resolve('completed!');
      }, 1000);
    });
  }
}

describe('Hello, async/await tests', () => {
  test('should resolve after some time', async () => {
    const myClassObj = new MyClass();
    const result = await myClassObj.delayedPromise();
    expect(result).toEqual('completed!');
  });
});
```
| EXAMPLE: |
| :------- |
| See [10: Asynchronous tests with *Jest*](10-jest-async-tests) for a runnable example. |

## HTML-based tests

*Jest* uses a library named [`jsdom`](https://github.com/jsdom/jsdom) for testing HTML elements and interactions.

Note that *jsdom* is not a browser, but a library that implements the DOM API. The benefit of this approach is the speed at which you can run your test, and the fact that you don't have to provide a full-blown environment to run your browser like you'd need when using other approaches.

In order to run you will need to do:

```bash
npm install --save-dev jsdom @types/jsdom
```

Then, you will need to update your `jest.config.js` configuration to enable the *jsdom* environment (instead of node)

```javascript
module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'jsdom',
  globals: {
    'ts-jest': {
      tsconfig: 'tsconfig.json'
    }
  },
  moduleFileExtensions: [
    'ts',
    'js'
  ],
  transform: {
    '^.+\\.(ts|tsx)$': 'ts-jest'
  },
  testMatch: [
    '**/test/**/*.test.(ts|js)'
  ]
};

```

With *jsdom* installed, and *Jest* set up, you can now write tests that check whether the *DOM* has been updated.

Consider the following simple function that sets the content of a `<div>`:

```typescript
function setTestDivContents(text: string) {
  const div = document.querySelector('#test_div');
  const pNode = document.createElement('p');
  pNode.textContent = text;
  div?.appendChild(pNode);
}
```

Then, we can write a test that validates that the function works as expected:

```typescript
describe('HTML test suite', () => {
  test('should set text on div', () => {
    document.body.innerHTML = `<div id="test_div"></div>`;
    const divElement = document.querySelector('#test_div');
    expect(divElement).not.toBeNull();

    setTestDivContents('Hello to Jason Isaacs!');
    expect(divElement?.textContent).toContain('Hello to Jason');
  });
});
```


### DOM events

There are times when we also need to test DOM events like the ones triggered when an user clicks on a button. The *jsdom* library will parse the script tags and JavaScript functions and execute them.

This is illustrated in the following snippet:

```typescript
describe('DOM events test suite', () => {

  const htmlBodyWithClickEventHandling = `
  <body>
    <button>Click me!</button>
    <script type="text/javascript">
      function clickEventHandler() {
        console.log('clickEventHandler called!');
      }
      const btn = document.querySelector('button');
      btn.addEventListener('click', clickEventHandler);
    </script>
  </body>
  `;


  test('should trigger a click DOM event', () => {
    const dom = new JSDOM(htmlBodyWithClickEventHandling, { runScripts: 'dangerously' });

    const button = <HTMLElement>dom.window.document.querySelector('button');
    const buttonSpy = jest.spyOn(button, 'click');
    button.click();
    expect(buttonSpy).toHaveBeenCalled();
  });
});
```

The first section defines the body of a simple HTML document that contains a clickable button. Then we set up a tst on which the document is laid out using *jsdom*, and then we simulate user interaction.

This technique can be extended to other DOM events, will give us the opportunity to construct snippets of HTML with JavaScript and test them.

| EXAMPLE: |
| :------- |
| See [11: HTML testing with *Jest* and *jsdom*](11-jest-jsdom-html) for a runnable example illustrating both examples of this section. |

## Protractor

[*Protractor*](https://github.com/angular/protractor) is a Node-based test runner that is used to perform end-to-end or automated acceptance testing. With *Protractor*, you have the capability to control a web browser programmatically.

You can install *Protractor* using:

```bash
npm install protractor
```

| NOTE: |
| :---- |
| *Protractor* is a program built on top of *WebDriverJS*. |


### Selenium

*Selenium* is a driver for web browsers. That is, it is engine that runs under the hood of *Protractor to handle the interaction with the browser.

| NOTE: |
| :---- |
| *Selenium* not only provides programmatic in JavaScript, but also in other programming languages like Python and Java. |

*Selenium* requires a Java runtime.


| NOTE: |
| :---- |
| There are no examples on Protractor/Selenium as it is not clear the approach for WSL2. |

## You know you've mastered this chapter when...

+ You understand what the *Test Driven Development (TDD)* entails.

+ You understand the different types of tests (unit/integration/acceptance) and its categorization (black-box/white-box).

+ You're familiar with *Jest* and *ts-jest* and know about the different configuration pieces.

+ You know how to create *Jest* tests and test suites for TypeScript in *Node.js* and *jsdom* environments.

+ You are aware of how to perform the following in *Jest*
  + Force and skip tests
  + Use the *Jest* matchers
  + Perform the test setup and teardown for test suites and tests
  + Perform data-driven tests
  + Use *Jest mocks and spies*
  + Write tests for async code (callback-based with `done()` and async/await)

+ You know how to write HTML tests, and how to integrate with *jsdom* to simulate user interactions.

+ You're aware that *Protractor* is an end-to-end testing tool that can be integrated with *Jest*.

## Exercises, code examples, and mini-projects

### [01: Hello, *Jest* in TypeScript](01-hello-jest-ts)
Provides a basic skeleton and sample test spec to illustratehow to use *Jest* in a TypeScript project.

### [02: Test-driven development &mdash; Hello, *Jest watch-mode*](02-hello-jest-ts-watch-mode)
Illustrates the *watch-mode* in *Jest*.

### [03: Grouping *Jest* tests with `describe()`](03-jest-grouping-tests)
Illustrates how to group tests into test suites.

### [04: Forcing and skipping tests in *Jest*](04-jest-forcing-and-skipping-tests)
Illustrates how to use `test.only()`, `fit()` and `fdescribe()` to force tests and `xit()` to skip tests, and how *Jest* behaves when forcing and skipping tests.

### [05: *Jest* matchers](05-jest-matchers)
A sandbox that illustrates *Jest* matchers.

### [06: *Jest* test setup and teardown](06-jest-setup-teardown-tasks)
Running setup and teardown activities for tests and test suites.

### [07: *Jest* data-driven tests](07-jest-data-driven-tests)
Running multiple tests based on data.

### [08: *Jest* mocks](08-jest-mocks)
Practising *Jest* mocks.

### [09: Test-driven development &mdash; *Jest* spies](09-jest-spies)
Practising *Jest* spies and mock implementations.

### [10: Asynchronous tests with *Jest*](10-jest-async-tests)
Practising asynchronous tests with *Jest*.

### [11: HTML testing with *Jest* and *jsdom*](11-jest-jsdom-html)
Introducing HTML testing and DOM event testing with *Jest* and *jsdom*.


## ToDo

- [ ] Summarize the known info about mocks, stubs and spies and compare with Jest concepts.

- [ ] Explore Jest coverage capabilities

- [ ] Investigate how to run e2e tests with *Protractor/Selenium* on WSL2 (maybe using Docker is a better option in order not to screw WSL2 environment).