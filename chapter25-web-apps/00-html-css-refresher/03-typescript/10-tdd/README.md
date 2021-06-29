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

The *TDD* testing paradigm is about starting with tests, and drive the implementation of functionality through these tests:
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

The `toBe()` matcher checks for object equality

### Test setup and teardown

### Data-driven tests

### Jest mocks

### Jest spies

#### Spies returning values

## Asynchronous tests

### Using done

### Using async/await

## HTML-based tests

### DOM events

## Protractor

### Selenium

### Finding page elements

## You know you've mastered this chapter when...


## Exercises, code examples, and mini-projects

### [01: Hello, *Jest* in TypeScript](01-hello-jest-ts)
Provides a basic skeleton and sample test spec to illustratehow to use *Jest* in a TypeScript project.

### [02: Test-driven development &mdash; Hello, *Jest watch-mode*](02-hello-jest-ts-watch-mode)
Illustrates the *watch-mode* in *Jest*.

### [03: Grouping *Jest* tests with `describe()`](03-jest-grouping-tests)
Illustrates how to group tests into test suites.

### [04: Forcing and skipping tests in *Jest*](04-jest-forcing-and-skipping-tests)
Illustrates how to use `test.only()`, `fit()` and `fdescribe()` to force tests and `xit()` to skip tests, and how *Jest* behaves when forcing and skipping tests.