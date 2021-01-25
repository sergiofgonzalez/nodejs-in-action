# 04-hello-chai
> an introduction to the popular `chai` assertion library.

## Description
*Chai* is a popular assertion library that comes with three interfaces: 
+ `assert`
+ `expect`
+ `should`

The *assert* interface is an enhancement of Node.js *assert* module with additional functions for comparing objects, arrays and their properties such as `typeOf`.

The following example shows how it is configured and how to use assert:
```javascript
const chai = require("chai");
const assert = chai.assert;

assert.typeOf(foo, "string");  
assert.equal(foo, "bar");
assert.lengthOf(foo, 3);
assert.property(tea, "flavors");
```

The *expect* interface provides a fluent, BDD-style interface that lets you write your tests in a more like English sentence:
```javascript
  const chai = require("chai");
  const expect = chai.expect;

  const foo = "bar";

  expect(foo).to.be.a("string");
  expect(foo).to.equal("bar");
```

The *should* interface is similar to *expect* but changes the prototype of the object, so that the objects in play are decorated with a `should` method:
```javascript
  const chai = require("chai");
  chai.should();

  const foo = "bar";

  foo.should.be.a("string");
  foo.should.equal("bar");
```