# 02-hello-mocha
> introducing the popular *Mocha* testing framework

## Description
*Mocha* is a popular behavior-driven development (BDD) that can also be used for test-driven development and unit testing.

To configure your project for *Mocha* you just have to add it as a development dependency, and tweak a little bit your `package.json`:

```javascript
...
  "devDependencies": {
    ...
    "mocha": "3.4.2"
  },
  "dependencies": {},
  "scripts": {
  ...
    "test": "node_modules/.bin/mocha app/tst",
    "test-debug": "node_modules/.bin/mocha app/tst --inspect-brk=${npm_config_debugHost:-127.0.0.1}"
  }
```

Invoking `mocha <dir>` will automatically execute all the JavaScript files in the test directory.

The *Mocha* tests are structured using global functions such as `describe`, `it`, `before`, `after`, `beforeEach` and `afterEach`. There's also a set of functions for TDD (`suite`, `test`, `setup`, `tearDown`...) which feature the same functionality but using other verbs. Even when using TDD, the BDD functions feels natural.

In the project, a simple `memdb` test suite is created:

```javascript
const memdb = require("../src/lib/memdb");
const assert = require("assert");


describe("memdb", () => {
  beforeEach(() => {
    memdb.clear();
  });


  describe(".first(obj)", () => {
    it("should return the first matching doc", () => {
      const truhan = { name: "Truhan"};
      const ciro = { name: "Ciro" };
      memdb.save(truhan);
      memdb.save(ciro);

      const ret = memdb.first({ name: "Truhan" });
      assert (ret === truhan);
    });

    it("should return null/undefined when no doc matches", () => {
      const ret = memdb.first({ name: "Lupita" });
      assert(ret == null);
    });
  });

  describe(".save(doc) (async mode)", () => {
    it("should save the document and execute callback", done => {
      const pet = { name: "Gilbert" };
      memdb.save(pet, () => {
        const ret = memdb.first({ name: "Gilbert" });
        assert(ret === pet);
        done(); // signal mocha you're done with the test
      });
    });
  });
});
```

Note that:
+ `mocha` is not *required* in the test code.
+ The start begins with a 1st level `describe` which will group several 2nd level `describe`s.
+ Each describe can include several `it` that describe the individual test cases.
+ You can also test async code. In such cases, *Mocha* provides a `done` callback you should invoke once the test case has completed.