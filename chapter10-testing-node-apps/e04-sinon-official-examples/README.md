# e04 &mdash; Sinon official examples
> practicing proxyquire with the official examples

## Description
*Sinon* is a testing library that provides standalone test spies, stubs and mocks for JavaScript.

### Fakes
`fake` allows the creation of a *fake function* with the ability to set a default behavior. In Sinon, a *fake* is a function that records arguments, return values, the value of `this` and any exception thrown (if any) for all of its calls.

A *fake* is immutable: once created, the behavior will not change.

Unlike *spies* and *stubs*, *fakes* created with `sinon.fake` knows only about how to create fakes and is not aware about how to plug them into the system under tests. In order to do that, you will need to use the `sinon.replace*` methods.

*Fakes* can be created with and without behavior.

Fake without behavior:
```javascript
const fake = sinon.fake();

fake();

fake.callCount(); // => 1
```

Fake with behavior:
```javascript
const fake = sinon.fake.returns('Hello');

fake(); // => 'Hello'
```

For further information on fakes API and properties, please review the official docs at https://sinonjs.org/releases/latest/fakes.

#### Selected Code Samples

##### Creating a fake that will throw an exception when invoked

```javascript
const fake = sinon.fake.throws(new Error('fabricated exception'));

fake(); // will throw new Error with err.message = 'fabricated exception'
```

##### Creating a fake that will be used to replace the behavior of `fs.readFile` (sync and async)
In the following example, `fs.readFile` is replaced with a fake function that when called, will return the given values.
```javascript
const fake = sinon.fake.yields(null, 'file content');

sinon.replace(fs, readFile, fake);
fs.readFile('somefile', (err, data) => console.log(data));
console.log('done');

// file content
// done
```

And asynchronously:
```javascript
const fakeAsync = sinon.fake.yieldsAsync(null, 'file content');

sinon.replace(fs, readFile, fakeAsync);
fs.readFile('somefile', (err, data) => console.log(data));
console.log(`done`);

// done
// file content
```


### Spies
A test *spy* is a function that records arguments, return values, the value of `this` and any exception thrown (if any) for all of its calls. There are two types of spies: anonymous functions and functions that wrap methods that exist in the system under test.

When the behavior of the spied function is not under test, you can use an anonymous function spy. The spy won't have any behavior except for recording information about its calls. A common use for an anonymous spy is to provide a callback to a function under test, to validate that it has been called according to your expectations.

For further information on spies API and properties, please review the official docs at https://sinonjs.org/releases/latest/spies.

#### Selected Code Samples

##### Wrapping the getters and setters of an object

```javascript
const object = {
  get test() {
    return this.property;
  }
  set test(value) {
    this.property = value * 2;
  } 
};


const spy = sinon.spy(object, 'test', ['get', 'set']);

object.test = 42;
spy.set.calledOnce; // true

object.test; // 84
spy.get.calledOnce; // true
```

### Stubs
Test stubs are spies with pre-programmed behavior. They support the full test spy API, in addition to method which can be used to alter the stub's behavior.

As spies, stubs can be either anonymous, or wrap existing functions. When wrapping an existing function with a stub, the original function is not called.

Use stubs when you want to:
* Control a method's behavior from a test for force the code down a specific path (e.g. to throw an error to simulate that database connection has failed).
* When you want to prevent a specific method from being called directory (e.g. when you don't want to perform an HTTP call).


```javascript
const stub = sinon.stub().throws();
```

Note that you can use `onCall` method to make a stub respond differently on consecutive calls.

For further information on stubs API and properties, please review the official documentation at https://sinonjs.org/releases/latest/stubs.

#### Selected Code Samples

##### Creating a stub with some defined behavior

```javascript
const callback = sinon.stub();
callback.withArgs(42).returns(1);
callback.withArgs(1).throws('name');

callback(); // no return value, no exception
callback(42); // returns 1
callback(1); // Throws Error('name')
```

##### Create a stub that calls a given fake

```javascript
// Real object
const myObj = {};
myObj.prop = () => 'foo';

// stubbing
sinon.stub(myObj, 'prop').callsFake(() => 'bar');

myObj.prop(); // bar
```

##### Creates a stub that calls a fake function when some args match or use the real function otherwise

```javascript
const stub = sinon.stub();
const obj = {};
obj.sum = (a, b) => a + b;

stub(obj, 'sum');

obj.sum.withArgs(2, 2).callsFake(() => 'foo');

obj.sum.callThrough();

obj.sum(2, 2); // 'foo'
obj.sum(1, 2); // 3
```

Same, but using `new`:
```javascript
const obj = {};
obj.Sum = function MyConstructor(a, b) { this.result = a + b; };

sinon
  .stub(obj, 'Sum')
  .callThroughWithNew()
  .withArgs(1, 2)
    .returns({ result: 9000 });

(new obj.Sum(2, 2)).result; // 4
(new obj.Sum(1, 2)).result; // 9000

```

### Mocks
Mocks (and mock expectations) are fake methods (like spies) with pre-programmed behavior (like stubs) as well as pre-programmed expectations. That is, a mock will fail your test if it is not used as expected.

Mocks should only be used for the method under test. In every unit test, there should be one unit under test. If you want to control how your unit is being used and like stating expectations upfront (instead of asserting after the fact), use a mock.

The rule of thumb is: if you wouldn't add an assertion for some specific call, don't mock it. Use a stub instead.

For further information on stubs API and properties, please review the official documentation at https://sinonjs.org/releases/latest/mocks.
